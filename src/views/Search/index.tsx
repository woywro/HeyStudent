import { List } from "./components/List";
import { PageTopBar } from "../../components/PageTopBar";
import { useSearchContext } from "../../context/searchContext";
import { SearchBar } from "./components/SearchBar";
import { StyledSearch } from "./style";
import { ItemType } from "../../types";

interface Props {
  data: ItemType[];
}

export const Search = ({ data }: Props) => {
  const { searched, setSearched } = useSearchContext();
  setSearched(data);
  return (
    <StyledSearch>
      <PageTopBar title="wyszukiwanie">
        <SearchBar />
      </PageTopBar>
      <List />
    </StyledSearch>
  );
};
