import React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useUserContext } from "../../../context/userContext";

export const ChatMessage = (props) => {
  const { user } = useUserContext();
  const { text, uid } = props.message;

  const messageColor = uid === user.uid ? "primary.light" : "#BEBEBE";
  const messageJustify = uid === user.uid ? "flex-end" : "flex-start";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: messageJustify,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          margin: 0.5,
          padding: 0.8,
          maxWidth: 0.8,
          borderRadius: "20px",
          backgroundColor: messageColor,
          color: "white",
        }}
      >
        <p>{text}</p>
      </Paper>
    </Box>
  );
};
