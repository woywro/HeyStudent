import { List } from "./components/List";
import { PageTopBar } from "../../components/PageTopBar";
import { useSearchContext } from "../../context/searchContext";
import { SearchBar } from "./components/SearchBar";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";

const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 70%;
  }
`;

export const Search = ({ data }) => {
  const { searched, setSearched } = useSearchContext();
  setSearched(data);
  return (
    <StyledSearch>
      <PageTopBar>
        <SearchBar />
      </PageTopBar>
      <List elements={data} />
    </StyledSearch>
  );
};
