import { ListItem } from "../../../components/ListItem";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { db } from "../../../firebase/firebase";
import { Container } from "@mui/material";
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ElementCard } from "../../../components/ElementCard";
import { useFieldsOfStudyContext } from "../../../context/fieldsOfStudyContext";
import { useLoadingContext } from "../../../context/loadingContext";
import { ItemType } from "../../../types";

export const HomeList = () => {
  const { fieldsOfStudy, setFieldsOfStudy } = useFieldsOfStudyContext();
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    async function getData() {
      const array: ItemType[] = [];
      const colRef = collection(db, "Courses");
      const q = query(colRef, orderBy("willStudyCount"), limit(3));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        array.push(doc.data());
      });
      setFieldsOfStudy(array);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <Container
      sx={{
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        width: 1,
        padding: "20px",
      }}
      component="ul"
    >
      <>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Odkrywaj kierunki
        </Typography>
        <ElementCard
          title="Najpopularniejsze"
          content={
            <Grid
              container
              spacing={1}
              sx={{
                height: 1,
              }}
            >
              {isLoading && (
                <Box sx={{ width: "100%", height: "100%" }}>
                  <CircularProgress />
                </Box>
              )}
              {fieldsOfStudy.map((item: ItemType) => {
                return (
                  <Grid item xs={12} sm={6} md={6}>
                    <ListItem key={item.id} item={item} />
                  </Grid>
                );
              })}
            </Grid>
          }
        />
      </>
    </Container>
  );
};
