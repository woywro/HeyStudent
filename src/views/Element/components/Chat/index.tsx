import React, { useState } from "react";
import { db } from "../../../../firebase/firebase";
import { ChatMessage } from "../ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, addDoc, query, limit, orderBy } from "firebase/firestore";
import { useUserContext } from "../../../../context/userContext";
import { ItemType } from "../../../../types";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { LockedFunction } from "../../../../components/LockedFunction";
import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;

const MessagesList = styled.div`
  overflow-y: scroll;
  height: 150px;
  padding: 10px;
  width: 100%;
  background: #e2e7f3;
  border-radius: 10px;
  margin: 5px;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;

const SendMessage = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
`;

interface Props {
  element: ItemType;
}

export const Chat = ({ element }: Props) => {
  const messagesRef = collection(db, `Chats/${element.id}/messages`);
  const q = query(messagesRef, orderBy("createdAt"), limit(6));
  const [messages] = useCollectionData(q, {
    idField: "id",
  });
  const { user } = useUserContext();

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const today = new Date();
    const time = today.getTime();

    await addDoc(messagesRef, {
      text: formValue,
      uid: user.uid,
      createdAt: time,
      course: element.id,
    });
    setFormValue("");
  };

  return user ? (
    <Container>
      <MessagesList>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </MessagesList>
      <SendMessage onSubmit={sendMessage}>
        <Input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="napisz wiadomość"
        />
        <Button type="submit" disabled={!formValue}>
          wyślij
        </Button>
      </SendMessage>
    </Container>
  ) : (
    <LockedFunction />
  );
};
