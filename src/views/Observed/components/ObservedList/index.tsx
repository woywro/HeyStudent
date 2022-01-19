import { useState } from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { ObservedItem } from "../ObservedItem";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useUserContext } from "../../../../context/userContext";
import { useUserDataContext } from "../../../../context/userDataContext";
import { db } from "../../../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Container } from "./style";

export const ObservedList = () => {
  const { user } = useUserContext();
  const { userData } = useUserDataContext();
  const [likedArray, setLikedArray] = useState([]);
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (user && userData.likedItems.length !== 0) {
      const getData = async () => {
        setLoading(true);
        const array: any[] = [];
        const ref = collection(db, "Courses");
        const q = query(ref, where("id", "in", userData.likedItems));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
        setLikedArray(array);
        setLoading(false);
      };
      getData();
    }
  }, [userData]);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : likedArray.length == 0 ? (
        <Typography variant="subtitle1">
          Nie obserwujesz żadnych kierunków
        </Typography>
      ) : (
        likedArray.map((element) => {
          return (
            <ObservedItem
              element={element}
              likedArray={likedArray}
              setLikedArray={setLikedArray}
            />
          );
        })
      )}
    </Container>
  );
};
