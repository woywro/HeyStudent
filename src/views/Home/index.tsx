import { SearchBar } from "../Search/components/SearchBar";
import { HomeList } from "./components/HomeList";
import { PageTopBar } from "../../components/PageTopBar";
import { StyledHome } from "./style";
import { Loading } from "../../components/Loading";

export const Home = () => {
  return (
    <StyledHome>
      <PageTopBar title="wyszukaj kierunek">
        <SearchBar />
      </PageTopBar>
      <HomeList />
    </StyledHome>
  );
};
