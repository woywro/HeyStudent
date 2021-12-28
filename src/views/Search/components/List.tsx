import { ListItem } from "../../../components/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { defineSuffix } from "../../../utils/defineSuffix";
import Grid from "@mui/material/Grid";
import { useLoadingContext } from "../../../context/loadingContext";
import { useSearchContext } from "../../../context/searchContext";

export const List = ({ elements }) => {
  const { isLoading } = useLoadingContext();
  const { searched } = useSearchContext();
  return (
    <Container
      sx={{
        margin: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "column",
        width: "100vw",
        padding: "10px",
      }}
      component="ul"
    >
      <Typography variant="h6">Wyniki wyszukiwania</Typography>
      {searched.length == 0 ? (
        <Typography variant="subtitle1" sx={{ padding: 1 }}>
          Brak wyników dla podanych kryteriów
        </Typography>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ padding: 1 }}>
            znaleziono {searched.length}{" "}
            {defineSuffix(
              searched.length,
              "kierunek spełniający",
              "kierunki spełniające",
              "kierunków spełniających"
            )}{" "}
            kryteria
          </Typography>
          <Grid container spacing={2}>
            {searched.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <ListItem key={item.id} item={item} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      {isLoading && (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
