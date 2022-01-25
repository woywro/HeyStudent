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
import { Container, MessagesList, SendMessage } from "./style";

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
        <Button type="submit">wyślij</Button>
      </SendMessage>
    </Container>
  ) : (
    <LockedFunction />
  );
};
