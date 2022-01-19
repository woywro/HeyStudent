import { SearchBar } from "../Search/components/SearchBar";
import { HomeList } from "./components/HomeList";
import { PageTopBar } from "../../components/PageTopBar";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";

const StyledHome = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 70%;
  }
`;
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
