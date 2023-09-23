import { memo, useEffect, useState, useMemo, useCallback } from "react";
import { Star, Trash2 } from "react-feather";
import { StyledContainer } from "./styles";
import { activityStore } from "@/stores/activity";

export interface autoCompleteProps {
  id: number;
  name: string;
  owner: string;
  onClickCallback: Function;
  handleMouseEnterCallback: any;
  handleMouseLeaveCallback: any;
  stargazers_count: number;
  updated_at: string;
  uniqueColor: string;
  isHovered: boolean;
}

const WatchItem = ({
  id,
  name,
  owner,
  stargazers_count,
  updated_at,
  onClickCallback,
  uniqueColor,
  handleMouseEnterCallback,
  handleMouseLeaveCallback,
  isHovered,
}: autoCompleteProps) => {
  const [show, setShow] = useState(false);
  const formattedCount = useMemo(
    () =>
      stargazers_count >= 10000
        ? (stargazers_count / 1000).toFixed(1) + "K"
        : stargazers_count.toString(),
    []
  );

  const formatDate = useCallback(
    (dateString: string) => {
      const now = new Date();
      const updatedDate = new Date(dateString);

      const secondsDiff = Math.floor(
        (now.getTime() - updatedDate.getTime()) / 1000
      );

      const daysDiff = Math.floor(secondsDiff / 86400);
      const monthsDiff = Math.floor(daysDiff / 30);

      if (daysDiff <= 1) {
        return "1 day ago";
      }
      if (daysDiff < 30) {
        return `${daysDiff} days ago`;
      }
      if (monthsDiff <= 1) {
        return "1 month ago";
      }
      if (monthsDiff < 12) {
        return `${monthsDiff} months ago`;
      }

      return `on ${updatedDate.toLocaleDateString()}`;
    },
    [updated_at]
  );

  const handleOnClick = () => onClickCallback(id);
  const handleMouseEnter = () => {
    setShow(true);
    handleMouseEnterCallback(id);
  };
  const handleMouseLeave = () => {
    setShow(false);
    handleMouseLeaveCallback(id);
  };

  return (
    <StyledContainer
      color={uniqueColor}
      isHover={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Info */}
      <div>
        <div className="name">
          <span className="accent">{owner} / </span>
          {/* ECLIPLSE */}
          <span className="truncate">{name}</span>
        </div>
        <div className="info">
          <Star className="icon" size={16} />
          <span className="count">{formattedCount}</span>
          <span className="accent"> Updated {formatDate(updated_at)}</span>
        </div>
      </div>
      {/* Trash CTA */}
      {show && (
        <div className="cta" onClick={handleOnClick}>
          <Trash2 />
        </div>
      )}
    </StyledContainer>
  );
};

export default memo(WatchItem);
