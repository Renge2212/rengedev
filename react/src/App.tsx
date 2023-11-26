import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "./feature/EntryPage";
import LoginPage from "./feature/LoginPage";
import ServicePage from "./feature/ServicePage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { headerTheme, mainTheme } from "./type/theme-options";
import { createContext, useState } from "react";
import CreateAccount from "./feature/CreateAccount";

export const IsDesktop = createContext(true);

function App() {
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > 600 ? true : false
  );

  return (
    <div className="App">
      <BrowserRouter>
        <IsDesktop.Provider value={isDesktop}>
          <ThemeProvider theme={headerTheme}>
            <CssBaseline />
            <Header />
          </ThemeProvider>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/createAccount" element={<CreateAccount />} />
              <Route path="/service" element={<ServicePage />} />
            </Routes>
          </ThemeProvider>
        </IsDesktop.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
