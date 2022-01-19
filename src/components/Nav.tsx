import React, { useEffect } from "react";
import styled from "styled-components";
import breakpoint from "../theme/breakpoints";
import { useRouter } from "next/router";
import { useUserContext } from "../context/userContext";
import { StyledButton } from "./StyledButton";
import { logout } from "../firebase/firebase";
import { useCallback } from "react";

const Container = styled.div`
  @media only screen and ${breakpoint.device.xs} {
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
  @media only screen and ${breakpoint.device.lg} {
    display: none;
  }
`;

const NavItems = styled.ul`
  list-style: none;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  display: flex;
`;

const NavItem = styled.li`
  text-decoration: none;
  font-size: 24px;
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  ${StyledButton}
`;

const Nav = ({ open, setOpen }) => {
  const { user } = useUserContext();

  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);
  const handleLogout = useCallback(() => {
    router.push("/");
    logout();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router]);

  return (
    <Container open={open}>
      <NavItems>
        <NavItem onClick={() => router.push("/")}>Strona główna</NavItem>
        <NavItem onClick={() => router.push("/observed")}>
          Obserwowane kierunki
        </NavItem>
        <NavItem onClick={() => router.push("/add")}>
          Dodawanie Kierunku
        </NavItem>
      </NavItems>
      {user ? (
        <Button onClick={handleLogout}>Wyloguj</Button>
      ) : (
        <Button onClick={handleLogin}>Zaloguj</Button>
      )}
    </Container>
  );
};

export default Nav;
