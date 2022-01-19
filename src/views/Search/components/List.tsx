import { ListItem } from "../../../components/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { defineSuffix } from "../../../utils/defineSuffix";
import { useLoadingContext } from "../../../context/loadingContext";
import { useSearchContext } from "../../../context/searchContext";
import styled from "styled-components";
import { Text } from "../../../components/Text";

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
      <Text bold>Wyniki wyszukiwania</Text>
      {searched.length == 0 ? (
        <Text size="small">Brak wyników dla podanych kryteriów</Text>
      ) : (
        <>
          <Text size="small">
            znaleziono {searched.length}{" "}
            {defineSuffix(
              searched.length,
              "kierunek spełniający",
              "kierunki spełniające",
              "kierunków spełniających"
            )}{" "}
            kryteria
          </Text>
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
