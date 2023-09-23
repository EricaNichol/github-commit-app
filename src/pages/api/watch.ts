// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readCache, createCacheDirectory, saveCache } from "./utils";
import stringToColor from "string-to-color";

interface ResponseData {
  items?: any[];
  cache?: boolean;
  error?: any;
  message?: string;
}

interface WatchedProps {
  id: number;
  owner: string;
  name: string;
  stargazers_count: number;
  updated_at: string;
  uniqueColor: string;
}

const cacheDirectory = path.join(process.cwd(), "cache", "watchTable");
const cacheFilePath = path.join(cacheDirectory, `watchedRepos.json`);

export const _addRepoToWatch = async (
  payload: WatchedProps
): Promise<WatchedProps | null> => {
  const cachedData = await readCache(cacheFilePath);
  const reposList: WatchedProps[] = cachedData?.data || [];

  if (!reposList.find((item) => item?.id === payload.id)) {
    reposList.push(payload);
  }

  await saveCache(reposList, cacheFilePath);
  return payload;
};

const _getRepoWatchList = async (): Promise<string[]> => {
  const cachedData = await readCache(cacheFilePath);
  return cachedData?.data || [];
};

const _deleteRepoWatch = async (id: number): Promise<boolean> => {
  try {
    const cachedData = await readCache(cacheFilePath);
    const reposList: WatchedProps[] = cachedData?.data || [];

    const updatedList = reposList.filter((item) => item?.id !== id);

    await saveCache(updatedList, cacheFilePath);
    return true;
  } catch (e) {
    return false;
  }
};

// Side Quest
const _addActivties = async (payload: any, host: string): Promise<any> => {
  try {
    await fetch(`http://${host}/api/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: payload }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  } catch (error) {
    console.error("Error fetching the GitHub API: addActivties", error);
    throw error;
  }
};

const _removeActivties = async (id: any, host: string): Promise<any> => {
  try {
    await fetch(`http://${host}/api/activity`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  } catch (error) {
    console.error("Error fetching the GitHub API: addActivties", error);
    throw error;
  }
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const host = req.headers.host;

    await createCacheDirectory(cacheDirectory);

    switch (req.method) {
      case "GET":
        const repos = await _getRepoWatchList();
        if (!repos) res.status(400).json({ items: [], message: "not found" });
        else res.status(200).json({ items: repos, cache: true });
        break;

      case "POST":
        let payload = req.body?.data;
        // add uique  color to items and activity
        payload.uniqueColor = stringToColor(payload.id);

        //  add activity
        if (!payload) {
          res
            .status(400)
            .json({ error: "Repo name not provided in request body" });
          return;
        }

        const addedRepo = await _addRepoToWatch(payload);

        if (addedRepo) {
          // Async Side quest for Adding activites, need to complete this before sending
          // so the graph updates.
          await _addActivties(addedRepo, host as string);
          console.log("NEEEWWW WATCH ADDED");

          res.status(200).json({
            message: "Repo added to watch list",
          });
        } else {
          res.status(400).json({ error: "Repo already in watch list" });
        }
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;

      case "DELETE":
        let { id } = req.body;
        //  add activity
        if (!id) {
          res
            .status(400)
            .json({ error: "Repo id name not provided in request body" });
          return;
        }

        let wasRemoved = await _deleteRepoWatch(id);

        if (wasRemoved) {
          // Side quest for Adding activites
          await _removeActivties(id, host as string);

          res.status(200).json({ message: "Repo removed from watch list" });
        } else {
          res.status(400).json({ error: "Repo not found in watch list" });
        }

        break;
    }
  } catch (error: any) {
    console.error("Error in /api/watch:", error?.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
