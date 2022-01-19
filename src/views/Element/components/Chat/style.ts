import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;

export const MessagesList = styled.div`
  overflow-y: scroll;
  height: 150px;
  padding: 10px;
  width: 100%;
  background: #e2e7f3;
  border-radius: 10px;
  margin: 5px;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;

export const SendMessage = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
`;
