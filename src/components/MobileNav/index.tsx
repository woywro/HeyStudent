import React, { useEffect } from "react";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/userContext";
import { Button } from "../Button";
import { logout } from "../../firebase/firebase";
import { useCallback } from "react";
import { Container, NavItems, NavItem } from "./style";

export const MobileNav = ({ open, setOpen }) => {
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
