import SearchInput from "@/components/SearchInput";
import { useEffect, useRef, useState } from "react";
import { watchStore } from "@/stores/watch";
import { activityStore } from "@/stores/activity";
import WatchItem, { autoCompleteProps } from "../components/WatchItem";
import ActivityChart from "@/components/ActivityChart";
import { StyledContainer } from "./styles";
import tinycolor from "tinycolor2";
import { Search } from "react-feather";

export default function Home() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const chartRef = useRef<any>(null);
  const { watchedRepos, getWatchedRepos, removeWatchRepo } = watchStore(
    (state: any) => ({
      watchedRepos: state.watchedRepos,
      getWatchedRepos: state.getWatchedRepos,
      removeWatchRepo: state.removeWatchRepo,
    })
  );
  const { activities, getAllCommitActivity } = activityStore((state: any) => ({
    activities: state.activities,
    getAllCommitActivity: state.getAllCommitActivity,
  }));

  useEffect(() => {
    getWatchedRepos();
    getAllCommitActivity();
  }, []);

  const handleWatchDelete = async (id: any) => {
    await removeWatchRepo(id);
    // Might be able to explore nested models here.
    await getWatchedRepos();
    await getAllCommitActivity();
  };

  // make chart dataset opac color
  const handleMouseEnter = (id: number) => {
    setHoveredId(id);

    if (!chartRef.current) return;

    const chart = chartRef.current;

    // make chart dataset opac color
    chart?.data?.datasets.forEach((item: any) => {
      if (item.itemId !== id) {
        const hexColor = item.borderColor;

        // alpha is opacity
        item.borderColor = tinycolor(hexColor).setAlpha(0.3).toString();
      }
    });

    chart.update(); // Update whole chart
  };

  // make chart dataset normal color
  const handleMouseLeave = (id: number) => {
    setHoveredId(null);

    if (!chartRef.current) return;

    const chart = chartRef.current;

    chart?.data?.datasets.forEach((item: any) => {
      const rgba = item.borderColor;
      // alpha is opacity
      item.borderColor = tinycolor(rgba).setAlpha(1).toHexString();
    });

    chart.update(); // Update whole chart
  };

  return (
    <StyledContainer>
      {/* Main Chart Content */}
      <div className="chart">
        <ActivityChart forwardRef={chartRef} activities={activities} />
      </div>
      {/* Side */}
      <div className="side">
        <SearchInput />
        {watchedRepos?.length > 0 && (
          <ul>
            {watchedRepos?.map((item: autoCompleteProps) => (
              <li key={item?.id}>
                <WatchItem
                  {...item}
                  isHovered={hoveredId === null ? true : item.id === hoveredId}
                  handleMouseEnterCallback={handleMouseEnter}
                  handleMouseLeaveCallback={handleMouseLeave}
                  onClickCallback={handleWatchDelete}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Empty VIEW */}
        {watchedRepos?.length === 0 && (
          <div className="empty">
            <Search size={46} className="icon" />
            <div>Search for GitHub repository to populate graph</div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}
