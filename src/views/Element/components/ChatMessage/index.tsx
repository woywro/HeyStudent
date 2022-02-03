import React from "react";
import { useUserContext } from "../../../../context/userContext";
import { Message, MessageContainer } from "./style";

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

  const messageColor: string = uid === user.uid ? "#039be5" : "#BEBEBE";
  const messageJustify: string = uid === user.uid ? "flex-end" : "flex-start";

  return (
    <MessageContainer messageJustify={messageJustify}>
      <Message messageColor={messageColor}>{text}</Message>
    </MessageContainer>
  );
};
