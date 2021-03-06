import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;
