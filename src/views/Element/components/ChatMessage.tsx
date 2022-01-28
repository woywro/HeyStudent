import React from "react";
import { useUserContext } from "../../../context/userContext";

interface Props {
  message: {
    text: string;
    uid: string;
    course: string;
    createdAt: number;
  };
}

export const ChatMessage = ({ message }: Props) => {
  const { user } = useUserContext();
  const { text, uid } = message;

  const messageColor = uid === user.uid ? "primary.light" : "#BEBEBE";
  const messageJustify = uid === user.uid ? "flex-end" : "flex-start";

  return (
    <div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};
