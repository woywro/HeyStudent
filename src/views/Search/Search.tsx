import { List } from "./components/List";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import { useSearchContext } from "../../context/searchContext";
import { NameSearch } from "./components/NameSearch";
import { SearchBar } from "./components/SearchBar";
export const Search = ({ data }) => {
  const { searched, setSearched } = useSearchContext();
  setSearched(data);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: "10px",
        width: "100vw",
      }}
    >
      <SearchBar />
      <List elements={data} />
    </Container>
  );
};
