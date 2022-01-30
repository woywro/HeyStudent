import { shadow } from "../../mixnins/shadow";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import breakpoints from "../../theme/breakpoints";
export const StyledPageTopBar = styled.div`
  width: 100%;
  background: blue;
  padding: 10px;
  background: ${({ theme }) => theme.colors.primary};
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  ${shadow}
  align-items: center;
  @media only screen and ${breakpoints.device.xs} {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    margin: 0;
  }
  @media only screen and ${breakpoints.device.sm} {
    margin: 20px;
    border-radius: 10px;
  }
`;

export const PageTopBarTitle = styled.h1`
  font-weight: normal;
  font-size: 40px;
  color: white;
  margin: 10px;
  text-align: center;
`;
