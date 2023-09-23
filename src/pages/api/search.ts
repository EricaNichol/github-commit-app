// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readCache, createCacheDirectory, saveCache } from "./utils";

interface ResponseData {
  data?: any[];
  cache?: boolean;
  error?: any;
}
const CACHE_VALIDITY_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { query, limit = 10 } = req.query;

    // Validate query parameter
    if (!query || Array.isArray(query)) {
      res.status(400).json({ error: "Query parameter is missing or invalid." });
      return;
    }

    // NormalizeQuery
    const normalizedQuery =
      typeof query === "string" ? query.replace(/"/g, "") : "";

    // Construct cache paths
    const cacheDirectory = path.join(
      process.cwd(),
      "./cache",
      "searchTable",
      normalizedQuery.charAt(0)
    );
    const cacheFilePath = path.join(cacheDirectory, `${normalizedQuery}.json`);

    // Try to fetch data from cache
    const cacheData = await readCache(cacheFilePath);

    if (
      cacheData &&
      Date.now() - cacheData.timestamp < CACHE_VALIDITY_DURATION
    ) {
      return res.status(200).json({ ...cacheData, cache: true });
    }

    // Fetch data from GitHub API if not found in cache
    // TODO: use query-string
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        `${normalizedQuery} in:name`
      )}&per_page=${limit}`
    );

    const data = await response.json();

    const BFFdata = data?.items?.map((item: any) => ({
      id: item?.id,
      owner: item?.owner?.login,
      name: item?.name,
      stargazers_count: item?.stargazers_count,
      updated_at: item?.updated_at,
    }));

    // Create cache directory and save new data to cache
    await createCacheDirectory(cacheDirectory);
    // saveCache data has time stamp and data key
    const formattedData = await saveCache(BFFdata, cacheFilePath);

    // Respond with newly fetched data
    res.status(200).json({ ...formattedData, cache: false });
  } catch (error) {
    res.status(500).json({ error });
  }
};
