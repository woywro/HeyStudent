import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDoc } from "firebase/firestore";

export const userDataContext = createContext();

export const useUserDataContext = () => {
  const context = useContext(userDataContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const auth = getAuth();

  const [user] = useAuthState(auth);

  const value = { userData, setUserData };

  useEffect(() => {
    if (user) {
      async function getData() {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        const dat = docSnap.data();
        setUserData(dat);
      }
      getData();
    }
  }, [user]);

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};
