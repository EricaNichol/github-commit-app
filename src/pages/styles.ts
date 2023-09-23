import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100vw;
  background: white;
  height: 100vh;

  //   should be in body

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    list-style-type: none;
  }

  li {
    display: block;
  }

  display: flex;
  flex-direction: row;

  .chart {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .side {
    background: #37374a;
    width: 540px;
    min-width: 540px;
    padding: 80px 32px;
  }

  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: #242432;
    min-height: 200px;
    border-radius: 16px;
    color: #bcbcf2;
    font-size: 18px;
    line-height: 24px;
    padding: 44px 67px;

    .icon {
      align-self: center;
      margin-bottom: 20px;
    }
  }
`;
