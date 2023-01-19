import React from "react";
import RequreAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Profile from "./components/Profile";
import AllExercises from "./components/AllExercises";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route exact path='signup' element={<Signup />} />
        <Route exact path='login' element={<Login />} />
        <Route path='explore' element={<AllExercises />} />
        <Route path='/' element={<Home />} />

        {/* protected routes */}
        <Route element={<RequreAuth />}>
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}
