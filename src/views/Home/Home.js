import { List } from "./components/List";
import { SearchBar } from "./components/SearchBar";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { HomeList } from "./components/HomeList";
import { useContext } from "react";
import { dataContext } from "../../App";
import { PageTopBar } from "../../components/PageTopBar";
import { useSearchContext } from "../../context/searchContext";

export const Home = () => {
  const { searched } = useSearchContext();
  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
        width: "100vw",
      }}
    >
      <PageTopBar
        content={
          <>
            <Typography
              sx={{ marginBottom: 1, width: 1, color: "white" }}
              variant="h4"
            >
              Wyszukaj kierunek
            </Typography>
            <SearchBar />
          </>
        }
      />

      {searched !== false ? <List /> : <HomeList />}
    </Container>
  );
};
