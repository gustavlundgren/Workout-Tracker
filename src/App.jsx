import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/signup"} element={<Signup />} />
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/"} element={<Home />} />
      </Routes>
    </Router>
  );
}
