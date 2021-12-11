import TextField from "@mui/material/TextField";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { dataContext } from "../../App";
import { useContext } from "react";
import { search } from "../../utils/search";
export const NameSearch = () => {
  const context = useContext(dataContext);
  const [input, setInput] = useState("");

  const handleFind = () => {
    let inputArray = input.split("/");
    context.setIsSearching(true);
    search(
      context.setLoading,
      "Courses",
      "tags",
      "array-contains-any",
      inputArray,
      context.setSearched
    );
  };
  const handleClearList = () => {
    setInput("");
    context.setSearched([]);
    context.setIsSearching(false);
    context.setLoading(false);
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
