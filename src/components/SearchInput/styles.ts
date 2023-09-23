import styled from "styled-components";

export const StyledContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;

  .container {
    position: relative;
    width: 100%;
    height: 60px;

    input {
      color: #8383af;
      font-size: 16px;
      font-family: Roboto;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      padding-left: 16px;
      padding-right: 16px;
    }

    .icon {
      background: transparent;
      height: 100%;
      width: 22px;
      position: absolute;
      right: 16px;
    }
  }

  .results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    overflow-y: auto;
    background-color: white;
    z-index: 10;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    color: black;
    margin-top: -1px;
  }
`;
