import { ListItem } from "../../../components/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { defineSuffix } from "../../../utils/defineSuffix";
import { useLoadingContext } from "../../../context/loadingContext";
import { useSearchContext } from "../../../context/searchContext";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;

export const List = ({ elements }) => {
  const { isLoading } = useLoadingContext();
  const { searched } = useSearchContext();
  return (
    <Container>
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
          {searched.map((item) => {
            return <ListItem key={item.id} item={item} />;
          })}
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
