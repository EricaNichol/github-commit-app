// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readCache, createCacheDirectory, saveCache } from "./utils";

interface ResponseData {
  cache?: boolean;
  error?: any;
  message?: string;
  data?: any[];
}

interface ActivityProp {
  id: number;
  chartData: any;
}

const cacheDirectory = path.join(process.cwd(), "cache", "activityTable");
const cacheFilePath = path.join(cacheDirectory, "activities.json");

export const _addActivity = async (
  payload: ActivityProp
): Promise<ActivityProp | null> => {
  const cachedData = await readCache(cacheFilePath);
  const activityList: ActivityProp[] = cachedData?.data || [];

  if (!activityList.find((item) => item?.id === payload.id)) {
    activityList.push(payload);
  }

  await saveCache(activityList, cacheFilePath);
  return payload;
};

export const _getAllActivity = async () => {
  const cachedData = await readCache(cacheFilePath);
  return cachedData?.data || [];
};

const _deleteActivity = async (id: number): Promise<boolean> => {
  try {
    const cachedData = await readCache(cacheFilePath);
    const activityList: ActivityProp[] = cachedData?.data || [];

    const updatedList = activityList.filter((item) => item?.id !== id);

    await saveCache(updatedList, cacheFilePath);
    return true;
  } catch (e) {
    return false;
  }
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    switch (req.method) {
      case "GET":
        const activities = await _getAllActivity();
        if (!activities)
          res.status(400).json({ data: [], message: "not found" });
        else res.status(200).json({ data: activities, cache: true });
        break;

      case "POST":
        const payload = req.body?.data;
        let { name, owner, id, uniqueColor } = payload;
        //  add activity
        if (!payload) {
          res
            .status(400)
            .json({ error: "Activity name not provided in request body" });
          return;
        }
        // Validate query parameter
        if (typeof name !== "string" || typeof owner !== "string") {
          return res.status(400).json({ error: "Invalid query parameters" });
        }

        // Normalize the query parameters by trimming whitespace and converting to lowercase
        name = encodeURIComponent(name.trim().toLowerCase());
        owner = encodeURIComponent(owner.trim().toLowerCase());

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${name}/stats/participation`
        );

        const data = await response.json();

        // Create cache directory and save new data to cache
        await createCacheDirectory(cacheDirectory);

        // Try to fetch data from cache
        const activityData = {
          id, // id for parsing
          uniqueColor,
          chartData: data,
        };

        const addedActivity = await _addActivity(activityData);

        if (addedActivity) {
          res.status(200).json({
            message: "Repo added to watch list",
          });
        } else {
          res.status(400).json({ error: "Repo already in watch list" });
        }
        break;

      case "DELETE":
        let deleteId = req.body?.id;
        //  add activity
        if (!deleteId) {
          res
            .status(400)
            .json({ error: "Repo id name not provided in request body" });
          return;
        }

        let wasRemoved = await _deleteActivity(deleteId);

        if (wasRemoved) {
          res.status(200).json({ message: "Repo removed from watch list" });
        } else {
          res.status(400).json({ error: "Repo not found in watch list" });
        }
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
