import styled from "styled-components";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { dataContext } from "../../App";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { LikedItem } from "../molecules/LikedItem";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/material";
import { search } from "../../utils/search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid } from "@mui/material";

export const ObservedList = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const context = useContext(dataContext);
  const [likedArray, setLikedArray] = useState([]);

  useEffect(() => {
    if (context.user && context.userData.likedItems.length !== 0) {
      search(
        context.setLoading,
        "Courses",
        "id",
        "in",
        context.userData.likedItems,
        setLikedArray
      );
    }
  }, [context.userData]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "column",
        margin: 0,
        padding: "10px",
        width: "100vw",
      }}
    >
      {context.isLoading ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : likedArray.length == 0 ? (
        <Typography variant="subtitle1">
          Nie obserwujesz żadnych kierunków
        </Typography>
      ) : (
        <Grid container spacing={1}>
          {likedArray.map((element) => {
            return (
              <Grid item item xs={12} sm={6} md={6}>
                <LikedItem
                  element={element}
                  likedArray={likedArray}
                  setLikedArray={setLikedArray}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};
