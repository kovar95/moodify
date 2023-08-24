import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      dark: "#1a1313fc",
      light: "#646464",
      contrastText: "#1976d20a",
    },
    secondary: {
      main: "#494949",
      light: "#ffffff66",
    },
    info: {
      main: "#db3174",
      light: "#8080803b",
    },
    text: {
      primary: "#bababa",
    },
  },
});

export default theme;
