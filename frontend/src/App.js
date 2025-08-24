import React, { useState } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate,Outlet,} from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

// ✅ PrivateComponent (Protected Routes Wrapper)
const PrivateComponent = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user") // persist login
  );

  const handleLogin = () => {
    localStorage.setItem("user", "true"); // store flag
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Navbar always visible */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route element={<PrivateComponent isLoggedIn={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      <Footer /> {/* Footer always visible */}
    </Router>
  );
}

export default App;
