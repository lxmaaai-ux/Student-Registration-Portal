import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Background from "./components/Background";
import ThemeToggle from "./components/ThemeToggle";

import "./styles/main.css";

function App() {

  return (

    <BrowserRouter>

      <Background />

      <ThemeToggle />

      {/* Navbar */}

      <nav className="navbar">

        <Link to="/">
          Home
        </Link>

        <Link to="/register">
          Student Register
        </Link>

        <Link to="/login">
          Student Login
        </Link>

        <Link to="/admin-login">
          Admin Login
        </Link>

      </nav>

      {/* Routes */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

      </Routes>

      <footer className="footer">
        Built by Shravani 🚀
      </footer>

    </BrowserRouter>

  );

}

export default App;