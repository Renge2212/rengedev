import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import EntryPage from "./feature/EntryPage";
import LoginPage from "./feature/LoginPage";
import ServicePage from "./feature/ServicePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" Component={EntryPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/service" Component={ServicePage} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
