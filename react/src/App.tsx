import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import EntryPage from "./feature/EntryPage";
import LoginPage from "./feature/LoginPage";
import ServicePage from "./feature/ServicePage";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { theme } from "./type/theme-options";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  margin: 0,
  width: "100vw",
  height: "100vh",
  // background: "#ba68c8",
  backgroundImage: "url(assets/background.png)",
}));

function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}>
        <CssBaseline /> */}
      <StyledBox>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" Component={EntryPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/service" Component={ServicePage} />
          </Routes>
        </BrowserRouter>
      </StyledBox>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
