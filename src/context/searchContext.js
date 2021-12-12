import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
export const searchContext = createContext();

export const useSearchContext = () => {
  const context = useContext(searchContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const SearchContextProvider = ({ children }) => {
  const [searched, setSearched] = useState(false);

  const value = { searched, setSearched };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};
