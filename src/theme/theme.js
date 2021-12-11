import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#039be5",
    },
    secondary: {
      main: "#ffc400",
    },
  },
});
export const blueTheme = createTheme({
  palette: {
    primary: {
      main: "#3250e5",
    },
    secondary: {
      main: "#f9a825",
    },
  },
});
export const yellowTheme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
    secondary: {
      main: "#03dac5",
    },
  },
});
