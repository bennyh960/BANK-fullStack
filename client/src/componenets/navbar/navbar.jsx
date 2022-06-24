import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-container">
      <div>logo</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/users">Users</Link>
      </div>
    </nav>
  );
}
