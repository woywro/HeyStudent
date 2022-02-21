import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
import { doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebase";

interface userInterface {
  uid: string;
  likedItems: string[];
  name: string;
  observedSearches: string[];
  theme: string;
}

interface userType {
  user: userInterface;
  setUser: (arg: userInterface) => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const userContext = createContext<userType | {}>("");

export const useUserContext = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const dat = docSnap.data();
      setUser(dat);
      console.log(dat);
    }
    auth.onAuthStateChanged(() => {
      if (auth.currentUser !== null) {
        getData();
      } else {
        setUser("");
      }
    });
  }, [auth]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
