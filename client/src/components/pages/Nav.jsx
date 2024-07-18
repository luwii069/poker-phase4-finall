import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ComputerMoves from "../game/ComputerMoves";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //Check if user is logged in (using localStorage or state)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update isLoggedIn based on token existence
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root ("/") based on authentication status */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/moves" element={<ComputerMoves />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Nav;
