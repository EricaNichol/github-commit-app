import fs from "fs";

interface CacheData {
  timestamp: number;
  data: any;
}

/*
 * Reads data from cache file.
 * @param {string} cacheFilePath - The path to the cache file.
 * @returns {Promise<any | null>} - The cached data or null if no cache exists or an error occurred.
 */
export const readCache = async (cacheFilePath: string) => {
  try {
    const rawData = await fs.promises.readFile(cacheFilePath, "utf8");
    return JSON.parse(rawData);
  } catch (error: any) {
    return null;
  }
};

/**
 * Creates a cache directory if it does not exist.
 * @param {string} cacheDirectory - The path to the cache directory.
 */
export const createCacheDirectory = async (cacheDirectory: string) => {
  if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory, { recursive: true });
  }
};

/**
 * Saves data to cache file.
 * @param {any} data - The data to be cached.
 * @param {string} cacheFilePath - The path to the cache file.
 */
export const saveCache = async (data: any, cacheFilePath: string) => {
  try {
    // CacheData with time
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data,
    };

    await fs.promises.writeFile(
      cacheFilePath,
      JSON.stringify(cacheData),
      "utf8"
    );
    console.log("Data has been cached successfully", cacheFilePath);

    return cacheData;
  } catch (error) {
    console.error("Error saving data to cache", error);
  }
};
