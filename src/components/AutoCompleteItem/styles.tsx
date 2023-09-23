import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;

  .accent {
    color: #bfbdd9;
    font-weight: 400;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor: pointer;
    background: #ececf6;
  }
`;
