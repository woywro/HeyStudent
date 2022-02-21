import { ListItem } from "../../../../components/ListItem";
import { defineSuffix } from "../../../../utils/defineSuffix";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useSearchContext } from "../../../../context/searchContext";
import { Text } from "../../../../components/Text";
import { Container } from "./style";
import { Loading } from "../../../../components/Loading";
import { ItemType } from "../../../../types";

export const List = () => {
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
            znaleziono {searched.length}
            {defineSuffix(
              searched.length,
              "kierunek spełniający",
              "kierunki spełniające",
              "kierunków spełniających"
            )}
            kryteria
          </Text>
          {searched.map((item: ItemType) => {
            return <ListItem key={item.id} item={item} />;
          })}
        </>
      )}
      {isLoading && <Loading />}
    </Container>
  );
};
