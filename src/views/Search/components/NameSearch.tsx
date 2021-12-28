import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../../../utils/search";
import { useLoadingContext } from "../../../context/loadingContext";
import { useSearchContext } from "../../../context/searchContext";
import Link from "next/link";
import { useRouter } from "next/router";
export const NameSearch = () => {
  let router = useRouter();
  const { searched, setSearched } = useSearchContext();
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
    <Stack
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        onChange={(e) => {
          setInput(e.target.value.toLowerCase());
        }}
        placeholder={generatePlaceholder()}
        label="wyszukiwanie"
        fullWidth
        variant="standard"
        value={input}
      />
      <Link
        href={{
          pathname: ROUTE,
          query: { search: input.toString().replace(" ", "-") },
        }}
        passHref
      >
        <IconButton size="small" sx={{ borderRadius: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Link>
      <Link
        href={{
          pathname: HOMEROUTE,
          // query: { search: searched.toString().replace(" ", "-") },
        }}
        passHref
      >
        <IconButton
          size="small"
          sx={{ borderRadius: "10px" }}
          onClick={handleClearList}
        >
          x
        </IconButton>
      </Link>
    </Stack>
  );
};
