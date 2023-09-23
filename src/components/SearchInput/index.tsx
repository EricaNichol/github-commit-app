import { useEffect, useState, useRef } from "react";
import AutoCompleteItem, { autoCompleteProps } from "../AutoCompleteItem";
import { searchStore } from "@/stores/search";
import { watchStore } from "@/stores/watch";
import { activityStore } from "@/stores/activity";
import { StyledContainer } from "./styles";
import { Search } from "react-feather";

const SearchInput = () => {
  const searchRef = useRef();
  const [query, setQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(true);
  const { getSearchResults, results, resetAutoCompleteList } = searchStore(
    (state: any) => ({
      getSearchResults: state.getSearchResults,
      results: state.autoCompleteList,
      resetAutoCompleteList: state.resetAutoCompleteList,
    })
  );

  const { addToWatchRepos, getWatchedRepos } = watchStore((state: any) => ({
    addToWatchRepos: state.addToWatchRepos,
    getWatchedRepos: state.getWatchedRepos,
  }));

  const { getAllCommitActivity } = activityStore((state: any) => ({
    getAllCommitActivity: state.getAllCommitActivity,
  }));

  useEffect(() => {
    if (query.length >= 3) {
      const timeoutId = setTimeout(async () => {
        let res = await getSearchResults(query);
      }, 2000); // 2000 ms throttle time

      return () => clearTimeout(timeoutId); // Clear the timeout if the query changes
    }
  }, [query]);

  // Handle Clicking outside the component
  useEffect(() => {
    function handleClickOutside() {
      // The contains method checks if the clicked element
      // (event.target) is within the component or not. If it's not,
      // then the method will return false.
      // @ts-ignore
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        console.log("Clicked outside the component!");
        setShowResults(false);
      }
    }

    // Attach the click event handler
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOnClickCallback = async (data: any) => {
    await addToWatchRepos(data);
    // Might be able to explore nested models here.
    await getWatchedRepos();
    await getAllCommitActivity();
    resetAutoCompleteList();
    setQuery("");
  };

  return (
    // @ts-ignore
    <StyledContainer ref={searchRef}>
      <div className="container">
        <input
          type="text"
          value={query}
          onChange={handleOnChange}
          onFocus={() => setShowResults(true)}
          placeholder="Search a Github Repository..."
        />
        <Search color="black" className="icon" />
      </div>

      <div className="results">
        {results?.length > 0 && showResults && (
          <ul>
            {results?.map((result: autoCompleteProps) => (
              <li key={result?.id}>
                <AutoCompleteItem
                  {...result}
                  onClickCallback={handleOnClickCallback}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </StyledContainer>
  );
};

export default SearchInput;
