import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./pages/SignUp";
import {CartProvider}  from "./components/hooks/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/newuser" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
