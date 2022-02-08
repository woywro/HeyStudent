import { SearchBar } from "../Search/components/SearchBar";
import { HomeList } from "./components/HomeList";
import { PageTopBar } from "../../components/PageTopBar";
import { StyledHome } from "./style";
import { NotificationBar } from "../../components/NotificationBar";
import { useNotificationContext } from "../../context/notifiactionContext";
import { useUserContext } from "../../context/userContext";
export const Home = () => {
  return (
    <StyledHome>
      <NotificationBar />
      <PageTopBar title="wyszukaj kierunek">
        <SearchBar />
      </PageTopBar>
      <HomeList />
    </StyledHome>
  );
};
