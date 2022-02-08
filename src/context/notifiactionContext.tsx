import { useState, useEffect, useContext } from "react";
import React from "react";
import { createContext } from "react";

interface notificationInterface {
  notifications: string[];
  setNotifications: (arg: string[]) => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const NotificationContext = createContext<notificationInterface>([]);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("context error");
  }
  return context;
};

export const NotificationContextProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
