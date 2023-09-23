import { create } from "zustand";

export const activityStore = create((set) => ({
  activities: [],
  getAllCommitActivity: async () => {
    try {
      // TODO: types
      const res: any = await fetch(`/api/activity`);

      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      const resJSON = await res.json();
      const { data } = resJSON;
      console.log("***** getAllCommitActivity", resJSON);

      if (data) set({ activities: data });
    } catch (error) {
      console.error(
        "Error fetching the GitHub API: getRepoCommitActivity",
        error
      );
      throw error;
    }
  },
  constructDataSet: (arr: []) => {
    const dataSet = arr?.map((item: any, index) => ({
      borderColor: `${item.uniqueColor}`,
      itemId: item?.id,
      data: item?.chartData?.all,
      tension: 0.5, // Adjust this value for desired curvature. Values between 0 and 1.
      borderWidth: 3,
      pointBackgroundColor: "white",
      pointHoverBackgroundColor: `${item.uniqueColor}`,
      pointRadius: 5,
      pointHoverRadius: 8,
    }));

    return dataSet;
  },
}));
