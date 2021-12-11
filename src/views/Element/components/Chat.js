import React, { useRef, useState } from "react";
import { db } from "../../../firebase/firebase";
import { dataContext } from "../../../App";
import { useContext } from "react";
import { ChatMessage } from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import {
  getDocs,
  getDoc,
  collection,
  setDoc,
  addDoc,
  query,
  doc,
  limit,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import "../../../App.css";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

export const Chat = () => {
  const context = useContext(dataContext);

  const messagesRef = collection(db, `Chats/${context.choosen.id}/messages`);
  const q = query(messagesRef, orderBy("createdAt"), limit(6));
  const [messages] = useCollectionData(q, {
    idField: "id",
  });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const today = new Date();
    const time = today.getTime();

    await addDoc(messagesRef, {
      text: formValue,
      uid: context.user.uid,
      createdAt: time,
      course: context.choosen.id,
    });
    setFormValue("");
  };

  return context.user ? (
    <>
      <Box
        elevation={6}
        sx={{ overflowY: "scroll", height: "150px", padding: 1 }}
      >
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
          <Button variant="contained" type="submit" disabled={!formValue}>
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
