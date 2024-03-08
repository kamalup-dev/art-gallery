import React from "react";
import logo from "../img/Screenshot 2024-03-06 162100.png";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../data/supabase";
import { logoutUser } from "../store/store";

function Header() {
  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    await supabase.auth.signOut();
    navigate("/art-gallery", { replace: true });
  };

  return (
    <nav className="navbar logo">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/art-gallery">
          {/* <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-text-top logo-image"
          /> */}
          <h1 className="logo-text-name" data-text="NIKITA">
            NIKITA
          </h1>
        </Link>
        <div className="navbar-item res-dp1" id="navbarNav">
          <ul className="navbar-list">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/art-gallery"
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/art-gallery/profile">
                About
              </Link>
            </li>
            <li className="nav-item">
              {!authUser ? (
                <Link className="nav-link" to="/art-gallery/login">
                  Login
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="dropdown res-dp2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 8H13.75M5 12H19M10.25 16L19 16"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <ul className="dropdown-menu" style={{left: "-89px"}}>
            <li>
            <Link
                className="dropdown-item"
                aria-current="page"
                to="/art-gallery"
              >
                Gallery
              </Link>
            </li>
            <li>
            <Link
                className="dropdown-item"
                aria-current="page"
                to="/art-gallery/profile"
              >
                About
              </Link>
            </li>
            <li>
            <Link
                className="dropdown-item"
                aria-current="page"
                to="/art-gallery/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
