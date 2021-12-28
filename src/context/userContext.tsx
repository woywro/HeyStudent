import { useState, useEffect, useContext } from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const userContext = createContext<any>({});

export const useUserContext = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(false);
  const auth = getAuth();

  const [userInfo] = useAuthState(auth);

  useEffect(() => {
    setUser(userInfo);
    console.log(userInfo);
  }, [userInfo]);

  const value = { user, setUser };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
