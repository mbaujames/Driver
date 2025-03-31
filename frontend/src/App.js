import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";



import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouterDOM from "react-router-dom";
const { Routes, Route } = ReactRouterDOM;



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />



      </Routes>
    </Router>
  );
}

export default App;
