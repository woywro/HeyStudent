import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";

interface loadingType {
  isLoading: boolean;
  setLoading: (arg: boolean) => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const loadingContext = createContext<loadingType>({});

export const useLoadingContext = () => {
  const context = useContext(loadingContext);
  if (context === undefined) {
    throw new Error("context error");
  }
  return context;
};

export const LoadingContextProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <loadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </loadingContext.Provider>
  );
};
