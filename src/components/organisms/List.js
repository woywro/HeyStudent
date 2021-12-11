import { ListItem } from "../molecules/ListItem";
import { dataContext } from "../../App";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { defineSuffix } from "../../utils/defineSuffix";
import Grid from "@mui/material/Grid";

export const List = () => {
  const context = useContext(dataContext);

  return (
    <Container
      sx={{
        margin: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "column",
        width: "100vw",
        padding: "20px",
      }}
      component="ul"
    >
      <Typography variant="h6">Wyniki wyszukiwania</Typography>
      {context.searched.length == 0 ? (
        <Typography variant="subtitle1" sx={{ padding: 1 }}>
          Brak wyników dla podanych kryteriów
        </Typography>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ padding: 1 }}>
            znaleziono {context.searched.length}{" "}
            {defineSuffix(
              context.searched.length,
              "kierunek spełniający",
              "kierunki spełniające",
              "kierunków spełniających"
            )}{" "}
            kryteria
          </Typography>
          <Grid container spacing={2}>
            {context.searched.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <ListItem
                    key={item.name}
                    item={item}
                    setChoosen={context.setChoosen}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      {context.isLoading && (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
