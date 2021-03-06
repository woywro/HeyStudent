import { logout } from "../../firebase/firebase";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { useRouter } from "next/router";
import { Burger } from "../Burger";
import { StyledTopBar, Title, NavItems, NavItem, SignButton } from "./style";

export const Nav = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);
  const handleLogout = useCallback(() => {
    router.push("/");
    logout();
  }, []);

  return (
    <StyledTopBar>
      <Title onClick={() => router.push("/")}>HeyStudent</Title>
      <Burger />
      <NavItems>
        <NavItem
          isActive={router.pathname == "/" ? true : false}
          onClick={() => router.push("/")}
        >
          Strona główna
        </NavItem>
        <NavItem
          onClick={() => router.push("/posts")}
          isActive={router.pathname == "/posts" ? true : false}
        >
          Blog
        </NavItem>
        <NavItem
          onClick={() => router.push("/observed")}
          isActive={router.pathname == "/observed" ? true : false}
        >
          Obserwowane kierunki
        </NavItem>
        <NavItem
          onClick={() => router.push("/add")}
          isActive={router.pathname == "/add" ? true : false}
        >
          Dodawanie Kierunku
        </NavItem>
      </NavItems>
      {user ? (
        <SignButton onClick={handleLogout}>Wyloguj</SignButton>
      ) : (
        <SignButton onClick={handleLogin}>Zaloguj</SignButton>
      )}
    </StyledTopBar>
  );
};
