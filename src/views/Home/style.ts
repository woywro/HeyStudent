import breakpoints from "../../theme/breakpoints";
import styled from "styled-components";

export const StyledHome = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;
