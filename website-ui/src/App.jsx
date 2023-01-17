import React from "react";
import RequreAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import NewWorkout from "./components/NewWorkout";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route exact path='signup' element={<Signup />} />
        <Route exact path='login' element={<Login />} />

        {/* protected routes */}
        <Route element={<RequreAuth />}>
          <Route path='/' element={<Home />} />
          <Route path="new-workout" element={<NewWorkout />} />
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}
