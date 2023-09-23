import React from "react";
import { StyledContainer } from "./styles";

export interface autoCompleteProps {
  id: number;
  name: string;
  owner: string;
  onClickCallback: Function;
}

const AutoCompleteItem = ({
  onClickCallback,
  ...resProp
}: autoCompleteProps) => {
  const { owner, name, id } = resProp;

  const handleOnClick = () => {
    onClickCallback(resProp);
  };

  return (
    <StyledContainer onClick={handleOnClick}>
      <span className="accent">{owner} /</span>
      <span className="truncate">{name}</span>
    </StyledContainer>
  );
};

export default React.memo(AutoCompleteItem);
