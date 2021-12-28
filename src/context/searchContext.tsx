import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
import { ItemType } from "../types";

interface searchType {
  searched: ItemType[];
  setSearched: (arg: ItemType[]) => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const searchContext = createContext<searchType | {}>([]);

export const useSearchContext = () => {
  const context = useContext(searchContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const SearchContextProvider = ({ children }: Props) => {
  const [searched, setSearched] = useState<ItemType[]>([]);

  return (
    <searchContext.Provider value={{ searched, setSearched }}>
      {children}
    </searchContext.Provider>
  );
};
