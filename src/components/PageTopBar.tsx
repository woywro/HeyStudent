import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";
import breakpoint from "../theme/breakpoints";

const StyledPageTopBar = styled.div`
  width: 100%;
  background: blue;
  padding: 10px;
  background: #039be5;
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-items: center;
  @media only screen and ${breakpoint.device.xs} {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    margin: 0;
  }
  @media only screen and ${breakpoint.device.lg} {
    margin: 20px;
    border-radius: 10px;
  }
`;

const StyledPageTopBarTitle = styled.h1`
  font-weight: normal;
  font-size: 40px;
  color: white;
  margin: 10px;
`;

export const PageTopBar = ({ children, title }) => {
  return (
    <StyledPageTopBar>
      <StyledPageTopBarTitle>{title}</StyledPageTopBarTitle>
      {children}
    </StyledPageTopBar>
  );
};
