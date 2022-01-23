import breakpoints from "../../theme/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  @media only screen and ${breakpoints.device.xs} {
    overflow: hidden;
    padding: 20px;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-flow: column;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    overflow; hidden;
    transition: transform 0.3s ease-in-out;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: none;
  }
`;

export const NavItems = styled.ul`
  list-style: none;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  display: flex;
`;

export const NavItem = styled.li`
  text-decoration: none;
  font-size: 24px;
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
`;
