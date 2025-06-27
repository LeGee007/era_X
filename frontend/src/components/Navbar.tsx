import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const navs = [
  { path: "/map", label: "Map" },
  { path: "/missions", label: "Missions" },
  { path: "/profile", label: "Profile" },
  { path: "/clan", label: "Clan" },
  { path: "/market", label: "Market" }
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      {navs.map((n) => (
        <button
          key={n.path}
          className={location.pathname === n.path ? "active" : ""}
          onClick={() => navigate(n.path)}
        >
          {n.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;