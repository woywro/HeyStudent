import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
export const choosenContext = createContext();

export const useChoosenContext = () => {
  const context = useContext(choosenContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const ChoosenContextProvider = ({ children }) => {
  const [choosen, setChoosen] = useState([]);

  const value = { choosen, setChoosen };

  return (
    <choosenContext.Provider value={value}>{children}</choosenContext.Provider>
  );
};
