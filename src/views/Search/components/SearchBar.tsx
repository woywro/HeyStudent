import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSearchContext } from "../../../context/searchContext";
import { useRouter } from "next/router";
import styled from "styled-components";
import breakpoint from "../../../theme/breakpoints";
import { useLoadingContext } from "../../../context/loadingContext";
import { useEffect } from "react";
import Link from "next/link";
import { StyledButton } from "../../../components/StyledButton";
import { Input } from "../../../components/Input";

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
  width: 90%;
  @media only screen and ${breakpoint.device.xs} {
    flex-flow: column;
  }
  @media only screen and ${breakpoint.device.lg} {
    flex-flow: row;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  ${StyledButton}
`;

export const SearchBar = () => {
  let router = useRouter();
  const [sort, setSort] = useState("random");
  const { searched, setSearched } = useSearchContext();

  const handleInputChange = (e) => {
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
  const HOMEROUTE = "/";

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
        <Input
          onChange={(e) => {
            setInput(e.target.value.toLowerCase());
          }}
          placeholder={generatePlaceholder()}
          value={input}
          type="text"
        />
        <ButtonGroup>
          <Link
            href={{
              pathname: ROUTE,
              query: { search: input.toString().replace(" ", "-") },
            }}
            passHref
          >
            <Button>Szukaj</Button>
          </Link>
          <Link
            href={{
              pathname: HOMEROUTE,
            }}
            passHref
          >
            <Button onClick={handleClearList}>x</Button>
          </Link>
        </ButtonGroup>
      </StyledNameSearch>

      {router.pathname !== "/" && (
        <ToggleButtonGroup
          value={sort}
          exclusive
          size="small"
          sx={{ marginTop: 2 }}
          onChange={handleInputChange}
        >
          <ToggleButton value="random">losowo</ToggleButton>
          <ToggleButton value="alphabetical">alfabetycznie</ToggleButton>
          <ToggleButton value="popularity">popularność</ToggleButton>
        </ToggleButtonGroup>
      )}
    </StyledSearchBar>
  );
};
