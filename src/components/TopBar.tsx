import { logout } from "../firebase/firebase";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import breakpoint from "../theme/breakpoints";
import Burger from "./Burger";
import { StyledButton } from "./StyledButton";
const StyledTopBar = styled.nav`
  position: sticky;
  top: 0;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  @media only screen and ${breakpoint.device.xs} {
    justify-content: space-between;
    background: #039be5;
  }
  @media only screen and ${breakpoint.device.lg} {
    padding-left: 20%;
    padding-right: 20%;
    justify-content: space-around;
    background: white;
  }
`;

const StyledNavItem = styled.a`
  text-decoration: none;
  font-size: 15px;
  color: black;
  cursor: pointer;
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: bold;
    `}
`;
const NavItems = styled.li`
  width: 50%;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  @media only screen and ${breakpoint.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
  }
`;
const StyledTitle = styled.h1`
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  @media only screen and ${breakpoint.device.xs} {
    color: white;
  }
  @media only screen and ${breakpoint.device.lg} {
    color: black;
  }
`;

const SignButton = styled.button`
  ${StyledButton}
  @media only screen and ${breakpoint.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
  }
`;

export const TopBar = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();
  const handleBack = useCallback(() => {
    router.back();
  }, []);
  const handleCloseMenu = useCallback(() => {
    setOpen(!isOpen);
  }, []);
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);
  const handleLogout = useCallback(() => {
    router.push("/");
    logout();
  }, []);

  return (
    <StyledTopBar>
      {children}
      <StyledTitle onClick={() => router.push("/")}>HeyStudent</StyledTitle>
      <Burger />
      <NavItems>
        <StyledNavItem
          isActive={router.pathname == "/" ? true : false}
          onClick={() => router.push("/")}
        >
          Strona główna
        </StyledNavItem>
        <StyledNavItem
          onClick={() => router.push("/observed")}
          isActive={router.pathname == "/observed" ? true : false}
        >
          Obserwowane kierunki
        </StyledNavItem>
        <StyledNavItem
          onClick={() => router.push("/add")}
          isActive={router.pathname == "/add" ? true : false}
        >
          Dodawanie Kierunku
        </StyledNavItem>
      </NavItems>
      {user ? (
        <SignButton onClick={handleLogout}>Wyloguj</SignButton>
      ) : (
        <SignButton onClick={handleLogin}>Zaloguj</SignButton>
      )}
    </StyledTopBar>
  );
};
