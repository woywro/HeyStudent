import { useCallback, useState } from "react";
import { useSearchContext } from "../../../../context/searchContext";
import { useRouter } from "next/router";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import {
  ToggleButtonGroup,
  ToggleButton,
} from "../../../../components/ToogleButtonGroup";

import { StyledSearchBar, StyledNameSearch, ClearButton, Row } from "./style";
import { ItemType } from "../../../../types";

export const SearchBar = () => {
  let router = useRouter();
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("random");
  const { searched, setSearched } = useSearchContext();
  const { isLoading, setLoading } = useLoadingContext();

  const handleInputChange = (e) => {
    e.preventDefault();
    setSort(e.target.value);
    sortList(e.target.value);
  };

  const sortList = useCallback(
    (sort) => {
      if (sort == "alphabetical") {
        const sorted = JSON.parse(
          JSON.stringify(
            searched.sort((a: ItemType, b: ItemType) => b.name[0] < a.name[0])
          )
        );
        setSearched(sorted);
      } else if (sort == "popularity") {
        const sorted = JSON.parse(
          JSON.stringify(
            searched.sort(
              (a: ItemType, b: ItemType) =>
                b.willStudy.length - a.willStudy.length
            )
          )
        );
        setSearched(sorted);
      } else if (sort == "random") {
        const shuffledArray = JSON.parse(
          JSON.stringify(searched.sort(() => 0.5 - Math.random()))
        );
        setSearched(shuffledArray);
      }
    },
    [sort, searched]
  );

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
