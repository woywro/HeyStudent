import { useState, useEffect, useContext } from "react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
export const userContext = createContext();

export const useUserContext = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const auth = getAuth();

  const [userInfo] = useAuthState(auth);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const value = { user, setUser };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
