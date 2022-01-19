import { useState } from "react";
import { useSearchContext } from "../../../../context/searchContext";
import { useRouter } from "next/router";
import styled from "styled-components";
import breakpoint from "../../../../theme/breakpoints";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import {
  ToggleButtonGroup,
  ToggleButton,
} from "../../../../components/ToogleButtonGroup";

const StyledSearchBar = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 60%;
  }
`;

const StyledNameSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media only screen and ${breakpoint.device.xs} {
    flex-flow: column;
  }
  @media only screen and ${breakpoint.device.lg} {
    flex-flow: row;
  }
`;

const ClearButton = styled.button`
  font-size: 15px;
  background: none;
  border: none;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #e2e7f3;
  border-radius: 10px;
`;

export const SearchBar = () => {
  let router = useRouter();
  const [sort, setSort] = useState("random");
  const { searched, setSearched } = useSearchContext();

  const handleInputChange = (e) => {
    e.preventDefault();
    setSort(e.target.value);
    sortList(e.target.value);
  };

  const sortList = (sort) => {
    if (sort == "alphabetical") {
      const sorted = JSON.parse(
        JSON.stringify(searched.sort((a, b) => b.name[0] < a.name[0]))
      );
      setSearched(sorted);
    } else if (sort == "popularity") {
      const sorted = JSON.parse(
        JSON.stringify(
          searched.sort((a, b) => b.willStudy.length - a.willStudy.length)
        )
      );
      setSearched(sorted);
    } else if (sort == "random") {
      const shuffledArray = JSON.parse(
        JSON.stringify(searched.sort(() => 0.5 - Math.random()))
      );
      setSearched(shuffledArray);
    }
  };

  const [input, setInput] = useState("");
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (router.pathname !== "/") {
      setInput(router.query.search.replace("-", " "));
    }
  }, []);

  const handleClearList = () => {
    setInput("");
    setSearched("");
    setLoading(false);
  };

  const defineRoute = () => {
    if (router.pathname == "/") {
      return "search/[search]";
    } else {
      return "[search]";
    }
  };

  const ROUTE = defineRoute();

  const generatePlaceholder = () => {
    const placeholders = [
      "np. informatyka Gdańsk",
      "np. Poznań ekonomia",
      "np. programowanie Poznań",
      "np. informatyka i ekonometria Gdańsk",
      "np. uniwersytet gdański",
    ];
    const random = Math.floor(Math.random() * placeholders.length);
    return placeholders[random];
  };

  return (
    <StyledSearchBar>
      <StyledNameSearch>
        <Row>
          <Input
            onChange={(e) => {
              setInput(e.target.value.toLowerCase());
            }}
            placeholder={generatePlaceholder()}
            value={input}
            type="text"
          />
          <ClearButton onClick={handleClearList}>x</ClearButton>
        </Row>
        <Link
          href={{
            pathname: ROUTE,
            query: { search: input.toString().replace(" ", "-") },
          }}
          passHref
        >
          <Button>Szukaj</Button>
        </Link>
      </StyledNameSearch>

      {router.pathname !== "/" && (
        <ToggleButtonGroup>
          <ToggleButton
            checked={sort == "random"}
            value="random"
            onClick={handleInputChange}
          >
            Random
          </ToggleButton>
          <ToggleButton
            checked={sort == "alphabetical"}
            value="alphabetical"
            onClick={handleInputChange}
          >
            Alphabetical
          </ToggleButton>
          <ToggleButton
            checked={sort == "popularity"}
            value="popularity"
            onClick={handleInputChange}
          >
            Popularity
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </StyledSearchBar>
  );
};
