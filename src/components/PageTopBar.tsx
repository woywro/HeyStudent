import styled from "styled-components";
import breakpoint from "../theme/breakpoints";
import { shadow } from "../mixnins/shadow";

const StyledPageTopBar = styled.div`
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
  text-align: center;
`;

export const PageTopBar = ({ children, title }) => {
  return (
    <StyledPageTopBar>
      <StyledPageTopBarTitle>{title}</StyledPageTopBarTitle>
      {children}
    </StyledPageTopBar>
  );
};
