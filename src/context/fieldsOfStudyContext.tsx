import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
import { ItemType } from "../types";

interface fosType {
  fieldsOfStudy: ItemType[];
  setFieldsOfStudy: (arg: ItemType[]) => void;
}

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const fieldsOfStudyContext = createContext<fosType | {}>({});

export const useFieldsOfStudyContext = () => {
  const context = useContext(fieldsOfStudyContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const FieldsOfStudyContextProvider = ({ children }: Props) => {
  const [fieldsOfStudy, setFieldsOfStudy] = useState<ItemType[]>([]);

  return (
    <fieldsOfStudyContext.Provider value={{ fieldsOfStudy, setFieldsOfStudy }}>
      {children}
    </fieldsOfStudyContext.Provider>
  );
};
