import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";
import { shadow } from "../../../../mixnins/shadow";

export const StyledPostItem = styled.li`
  border-radius: 10px;
  width: 100%;
  ${shadow}
  display: inline-grid;
  justify-items: center;
  align-items: center;
  position: relative;
  margin: 15px;
  padding: 10px;
  cursor: pointer;
  @media only screen and ${breakpoints.device.xs} {
    grid-template-columns: 1fr 2fr 1fr 1fr;
  }
  @media only screen and ${breakpoints.device.lg} {
    grid-template-columns: 1fr 3fr 3fr 3fr 1fr;
    grid-template-rows: 1fr;
  }
`;
