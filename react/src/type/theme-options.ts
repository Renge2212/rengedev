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

// const primaryColor = deepPurple[400]

// export const theme = createTheme({
//   palette: {
//     primary: {
//       //   light: "#757ce8",
//       main: "#462b45",
//       //   dark: "#002884",
//       contrastText: "#8caa32",
//     },
//     secondary: deepPurple,
//     error: red,
//     warning: orange,
//     info: cyan,
//     success: green,
//     background: {
//       //   default: "#ba68c8",
//       image: "url(https://example.com/image.jpg)",
//     },
//     text: { primary: "#ffffff" },
//   },
// });

export const theme = createTheme({
  palette: {
    background: {
      default: "#ba68c8",
    },
  },
});
