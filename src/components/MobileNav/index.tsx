import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/userContext";
import { Button } from "../Button";
import { logout } from "../../firebase/firebase";
import { useCallback } from "react";
import { Container, NavItems, NavItem } from "./style";

interface Props {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export const MobileNav = ({ open, setOpen }: Props) => {
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
        <NavItem onClick={() => router.push("/posts")}>Blog</NavItem>
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
