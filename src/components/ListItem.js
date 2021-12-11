import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { dataContext } from "../App";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { db } from "../firebase/firebase";
import { defineSuffix } from "../utils/defineSuffix";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export const ListItem = ({ item }) => {
  const context = useContext(dataContext);
  let navigate = useNavigate();

  async function handleObserve(e) {
    e.stopPropagation();
    let a = context.userData.likedItems;
    a.push(item.id);
    context.setUserData({ likedItems: a });
    await updateDoc(doc(db, "Users", context.user.uid), {
      likedItems: a,
    });
  }
  async function handleStopObserve(e) {
    e.stopPropagation();
    const newArray = context.userData.likedItems.filter((e) => e !== item.id);
    context.setUserData({ likedItems: newArray });
    await updateDoc(doc(db, "Users", context.user.uid), {
      likedItems: newArray,
    });
  }

  return (
    <Paper
      onClick={() => {
        context.setChoosen(item);
        navigate("/element", { replace: false });
      }}
      elevation={5}
      sx={{
        position: "relative",
        cursor: "pointer",
        padding: 1,
        borderRadius: "20px",
        marginTop: 1,
        width: 1,
      }}
    >
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              padding: 1,
            }}
          >
            {item.name.join(" ")}
          </Typography>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: 0,
          }}
        >
          {!context.isLoading &&
            context.user &&
            (context.userData.likedItems.includes(item.id) ? (
              <IconButton color="primary">
                <StarIcon
                  sx={{ color: "secondary.main" }}
                  onClick={handleStopObserve}
                />
              </IconButton>
            ) : (
              <IconButton color="primary">
                <StarBorderIcon
                  sx={{ color: "secondary.main" }}
                  onClick={handleObserve}
                />
              </IconButton>
            ))}
        </Box>
        <Grid item xs={12}>
          <Typography variant="body2">{item.university}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            {item.type}, {item.degree}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
