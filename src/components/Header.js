import React from "react";
import logo from "../img/Screenshot 2024-03-06 162100.png";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../data/supabase";
import { logoutUser } from "../store/store";

function Header() {
  const authUser = useSelector(state => state.user)
  console.log(authUser)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logoutUser())
    await supabase.auth.signOut()
  }

  return (
    <nav class="navbar logo">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/art-gallery">
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
              <Link class="nav-link active" aria-current="page" to="/art-gallery">
                Gallery
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/art-gallery/profile">
                About
              </Link>
            </li>
            <li class="nav-item">
              {!authUser ? <Link class="nav-link" to="/art-gallery/login">
                Login
              </Link>: <button className="btn btn-sm btn-warning" onClick={handleLogout}>Logout</button>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
