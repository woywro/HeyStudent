import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import { css } from "styled-components";
import { Button } from "../Button";

export const StyledTopBar = styled.nav`
  position: sticky;
  top: 0;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  @media only screen and ${breakpoints.device.xs} {
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.primary};
  }
  @media only screen and ${breakpoints.device.sm} {
    width: 100%;
    justify-content: space-around;
    background: white;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 80%;
    justify-content: space-around;
    background: white;
  }
`;

export const NavItem = styled.a<{ isActive: boolean }>`
  text-decoration: none;
  font-size: 15px;
  text-align: center;
  color: black;
  cursor: pointer;
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: bold;
    `}
`;
export const NavItems = styled.li`
  width: 50%;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.sm} {
    display: flex;
  }
`;
export const Title = styled.h1`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  @media only screen and ${breakpoints.device.xs} {
    color: white;
  }
  @media only screen and ${breakpoints.device.sm} {
    color: black;
  }
`;

export const SignButton = styled(Button)`
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.sm} {
    display: flex;
  }
`;
