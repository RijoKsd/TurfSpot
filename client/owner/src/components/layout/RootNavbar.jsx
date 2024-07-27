import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher.jsx";

const RootNavbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-md">
      <div className="navbar-start">
        <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          TurfSpot
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <Link to="/logout" className="btn btn-primary btn-outline">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default RootNavbar;
