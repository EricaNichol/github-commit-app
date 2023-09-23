import { create } from "zustand";

type SearchStoreState = {
  autoCompleteList: any[];
  getSearchResults: (query: string) => Promise<void>;
};

export const searchStore = create<SearchStoreState>((set) => ({
  autoCompleteList: [],
  getSearchResults: async (query: string) => {
    try {
      const res = await fetch(`/api/search?query=${query}`);
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      const resJSON = await res.json();
      const { data } = resJSON;
      console.log("***** getSearchResults", resJSON);

      if (data) set({ autoCompleteList: data });
    } catch (error) {
      console.error("Error fetching the GitHub API: getSearchResults", error);
      throw error;
    }
  },
  // reset to default value
  resetAutoCompleteList: () => set({ autoCompleteList: [] }),
}));
