import React, { useState } from "react";
import { db } from "../../../firebase/firebase";
import { ChatMessage } from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { collection, addDoc, query, limit, orderBy } from "firebase/firestore";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { useUserContext } from "../../../context/userContext";
import { ItemType } from "../../../types";

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
    <>
      <Box sx={{ overflowY: "scroll", height: "150px", padding: 1 }}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </Box>
      <Paper elevation={3} sx={{ padding: 1, borderRadius: "20px", margin: 1 }}>
        <Stack
          component="form"
          justifyContent="space-around"
          direction="row"
          onSubmit={sendMessage}
        >
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="napisz wiadomość"
          />
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!formValue}
          >
            wyślij
          </Button>
        </Stack>
      </Paper>
    </>
  ) : (
    <Typography variant="subtitle1">
      Zaloguj się aby mieć dostęp do tej funkcji
    </Typography>
  );
};
