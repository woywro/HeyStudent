import TextField from "@mui/material/TextField";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../../../utils/search";
import { useLoadingContext } from "../../../context/loadingContext";
import { useSearchContext } from "../../../context/searchContext";
export const NameSearch = () => {
  const { searched, setSearched } = useSearchContext();
  const [input, setInput] = useState("");
  const { isLoading, setLoading } = useLoadingContext();

  const handleFind = () => {
    let inputArray = input.split("/");
    search(
      setLoading,
      "Courses",
      "tags",
      "array-contains-any",
      inputArray,
      setSearched
    );
  };
  const handleClearList = () => {
    setInput("");
    setSearched(false);
    setLoading(false);
  };

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
        size="normal"
        value={input}
      />

      <IconButton
        size="small"
        sx={{ borderRadius: "10px" }}
        onClick={handleFind}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        size="small"
        sx={{ borderRadius: "10px" }}
        onClick={handleClearList}
      >
        x
      </IconButton>
    </Stack>
  );
};
