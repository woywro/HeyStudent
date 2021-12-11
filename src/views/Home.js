import { List } from "../components/organisms/List";
import { SearchBar } from "../components/organisms/SearchBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { HomeList } from "../components/organisms/HomeList";
import { useContext } from "react";
import { dataContext } from "../App";
import { PageTopBar } from "../components/molecules/PageTopBar";

export const Home = () => {
  let context = useContext(dataContext);
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

      {context.isSearching ? <List /> : <HomeList />}
    </Container>
  );
};
