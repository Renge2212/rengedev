import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import EntryPage from "./feature/EntryPage";
import LoginPage from "./feature/LoginPage";
import ServicePage from "./feature/ServicePage";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { headerTheme, mainTheme } from "./type/theme-options";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={headerTheme}>
          <CssBaseline />
          <Header />
        </ThemeProvider>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/service" element={<ServicePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
