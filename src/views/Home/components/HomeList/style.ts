import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

export const StyledHomeList = styled.ul`
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;
  flex-flow: column;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.sm} {
    width: 80%;
  }
`;
