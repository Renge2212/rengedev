import { ThemeOptions, createTheme } from "@mui/material";
import {
  blue,
  cyan,
  deepPurple,
  green,
  orange,
  red,
  purple,
} from "@mui/material/colors";

import Background from "../assets/background.png";

const primaryColor = deepPurple[400];

export const headerTheme = createTheme({
  palette: {
    primary: {
      main: "#394650",
      contrastText: "#ffffff",
    },
  },
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: deepPurple,
    error: red,
    warning: orange,
    info: cyan,
    success: green,
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.6)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            background-image: url('../static/react/background.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 100vh;
          }
        `,
    },
  },
});
