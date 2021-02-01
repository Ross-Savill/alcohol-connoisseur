import React, { useState } from "react";
import '../Stylesheets/MyUtilitiesSS/Navbar.css';
import { NavLink } from "react-router-dom";
import LogoutButton from '../AuthFolder/LogoutButton'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
  	<nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
      style={{ padding: 0 }}
    >
      <div className="nav-container">
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <LogoutButton />
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
              to="/sessions"
            >
              Sessions
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/breweries"
            >
              Breweries
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