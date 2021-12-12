import { useContext, useState } from "react";
import { dataContext } from "../../../App";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { LikedItem } from "./LikedItem";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/material";
import { search } from "../../../utils/search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid } from "@mui/material";
import {
  loadingContext,
  useLoadingContext,
} from "../../../context/loadingContext";
import { useUserContext } from "../../../context/userContext";
import { useUserDataContext } from "../../../context/userDataContext";

export const ObservedList = () => {
  const { user, setUser } = useUserContext();
  const { userData, setUserData } = useUserDataContext();
  const matches = useMediaQuery("(min-width:600px)");
  const [likedArray, setLikedArray] = useState([]);
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (user && userData.likedItems.length !== 0) {
      search(
        setLoading,
        "Courses",
        "id",
        "in",
        userData.likedItems,
        setLikedArray
      );
    }
  }, [userData]);

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
      {isLoading ? (
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
