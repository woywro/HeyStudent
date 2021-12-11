import React, { useRef, useState } from "react";
import { dataContext } from "../../../App";
import { useContext } from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

export const ChatMessage = (props) => {
  const context = useContext(dataContext);

  const { text, uid } = props.message;

  const messageColor = uid === context.user.uid ? "primary.light" : "#BEBEBE";
  const messageJustify = uid === context.user.uid ? "flex-end" : "flex-start";

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
          padding: 0.5,
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
