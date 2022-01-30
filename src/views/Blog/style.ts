import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.sm} {
    width: 70%;
  }
`;

export const PostList = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  align-items: center;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
    grid-template-columns: 1fr;
  }
  @media only screen and ${breakpoints.device.sm} {
    width: 90%;
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 80%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
