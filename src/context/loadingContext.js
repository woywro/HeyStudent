import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
export const loadingContext = createContext();

export const useLoadingContext = () => {
  const context = useContext(loadingContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  const value = { isLoading, setLoading };

  return (
    <loadingContext.Provider value={value}>{children}</loadingContext.Provider>
  );
};
