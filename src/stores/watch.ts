import { create } from "zustand";

export const watchStore = create((set) => ({
  watchedRepos: [],
  getWatchedRepos: async () => {
    try {
      // TODO: types
      const res: any = await fetch("/api/watch");
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      const resJSON = await res.json();
      const { items } = resJSON;
      console.log("***** getWatchedRepos", items);

      if (items) set({ watchedRepos: items });
    } catch (error) {
      console.error(
        "Error fetching the GitHub API: getRepoCommitActivity",
        error
      );
      throw error;
    }
  },
  addToWatchRepos: async (data: any) => {
    try {
      // TODO: types
      const res: any = await fetch("/api/watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      console.log("***** addToWatchRepos", res);

      if (!res.ok) {
        throw new Error("Network response was not ok.");
      } else {
        console.log("Add to Watch complete");
      }
    } catch (error) {
      console.error(
        "Error fetching the GitHub API: getRepoCommitActivity",
        error
      );
      throw error;
    }
  },
  removeWatchRepo: async (id: number) => {
    try {
      // TODO: types
      const res: any = await fetch("/api/watch", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      console.log("***** removeWatchRepo", res);

      if (!res.ok) {
        throw new Error("Network response was not ok.");
      } else {
        console.log("Remove Watch Complete");
      }
    } catch (error) {
      console.error(
        "Error fetching the GitHub API: getRepoCommitActivity",
        error
      );
      throw error;
    }
  },
}));
