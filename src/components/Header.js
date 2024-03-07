import React from "react";
import logo from "../img/Screenshot 2024-03-06 162100.png";
import "../styles/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav class="navbar logo">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* <img
            src={logo}
            alt="Logo"
            class="d-inline-block align-text-top logo-image"
          /> */}
          <h1 className="logo-text-name" data-text="NIKITA">NIKITA</h1>
        </Link>
        <div class="navbar-items" id="navbarNav">
          <ul class="navbar-list">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Gallery
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
