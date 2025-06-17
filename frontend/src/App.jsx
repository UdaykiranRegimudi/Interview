import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const [isAuthenticated,setAuth] = useState()
  useEffect(() =>{
    const isAuthenticated1 = localStorage.getItem("token");
    setAuth(isAuthenticated1)
  },[])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Navigate to={isAuthenticated ? "/dashboard" : "/loginForm"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginForm" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
