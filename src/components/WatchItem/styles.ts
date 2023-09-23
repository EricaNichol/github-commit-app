import styled from "styled-components";

export const StyledContainer = styled.div<{ color: string; isHover: boolean }>`
  background: #272736;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
  opacity: ${(props) => (props.isHover ? 1 : 0.3)};
  box-shadow: 8px 0px 0px ${(props) => (props.color ? props.color : "black")}
    inset;

  padding: 16px 24px;
  margin-bottom: 16px;

  .accent {
    color: #bfbdd9;
  }

  .name {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    width: 400px;

    .accent {
      flex-shrink: 0;
    }

    .truncate {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .info {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    margin-top: 8px;

    .count {
      font-weight: 700;
      margin: 0 5px;
    }
  }

  .cta {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &:hover {
    cursor: pointer;
  }
`;
