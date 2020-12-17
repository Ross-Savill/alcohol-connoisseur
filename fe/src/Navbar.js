import React, { useEffect, useState } from "react";
import './Stylesheets/Navbar.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
const DRINKS_URL = "http://localhost:5000/drinks";
const DRINKERS_URL = "http://localhost:5000/peopleNames";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
  	<nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="nav-container">
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/"
            >
              Main Table
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/drinkers"
            >
              Drinkers
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/ratingwords"
            >
              Rating Words
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/world-map"
            >
              World Map
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/us-map"
            >
              USA Map
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
 };


  export default Navbar;