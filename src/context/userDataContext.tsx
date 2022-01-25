import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
import { doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDoc } from "firebase/firestore";

interface userData {
  likedItems: string[];
  name: string;
  observedSearches: string[];
  theme: string;
}

interface userDataType {
  userData: userData;
  setUserData: (arg: any) => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const userDataContext = createContext<userDataType>("");

export const useUserDataContext = () => {
  const context = useContext(userDataContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const UserDataContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<userData>("");
  const auth = getAuth();

  useEffect(() => {
    if (auth !== undefined) {
      async function getData() {
        const docRef = doc(db, "Users", auth.uid);
        const docSnap = await getDoc(docRef);
        const dat = docSnap.data();
        setUserData(dat);
      }
      getData();
    }
  }, [auth]);

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </userDataContext.Provider>
  );
};
