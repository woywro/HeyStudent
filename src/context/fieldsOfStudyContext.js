import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";
export const fieldsOfStudyContext = createContext();

export const useFieldsOfStudyContext = () => {
  const context = useContext(fieldsOfStudyContext);

  if (context === undefined) {
    throw new Error("context error");
  }

  return context;
};

export const FieldsOfStudyContextProvider = ({ children }) => {
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);

  const value = { fieldsOfStudy, setFieldsOfStudy };

  return (
    <fieldsOfStudyContext.Provider value={value}>
      {children}
    </fieldsOfStudyContext.Provider>
  );
};
