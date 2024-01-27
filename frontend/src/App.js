import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import React from "react";
import MainRouter from "./MainRouter";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757de8",
      main: "#3f51b5",
      dark: "#002984",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
    openTitle: indigo["400"],
    protectedTitle: pink["400"],
    type: "light",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
};

export default App;
