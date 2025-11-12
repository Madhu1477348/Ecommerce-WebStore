import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // ✅ Function to close the offcanvas menu manually when clicking a link
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("mobileMenu");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ MadhuWebStore
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex ms-auto align-items-center">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item position-relative">
              <Link className="nav-link position-relative" to="/cart">
                Cart
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}

            {/* ✅ Theme Toggle Button */}
            <li className="nav-item ms-3">
              <button
                onClick={toggleTheme}
                className="btn btn-outline-light btn-sm"
                style={{ borderRadius: "20px" }}
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-start bg-dark text-light d-lg-none"
          tabIndex="-1"
          id="mobileMenu"
          style={{ width: "180px" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav flex-column text-start">
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to="/"
                  onClick={closeOffcanvas}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to="/products"
                  onClick={closeOffcanvas}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light position-relative"
                  to="/cart"
                  onClick={closeOffcanvas}
                >
                  Cart
                  {itemCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item mt-3">
                    <span className="nav-link text-light">
                      Hi, {user.name.split(" ")[0]}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light btn-sm mt-2 w-100"
                      onClick={() => {
                        logout();
                        closeOffcanvas();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/login"
                      onClick={closeOffcanvas}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/signup"
                      onClick={closeOffcanvas}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}

              {/* ✅ Theme Toggle Button for Mobile */}
              <li className="nav-item mt-3">
                <button
                  onClick={() => {
                    toggleTheme();
                    closeOffcanvas();
                  }}
                  className="btn btn-outline-light btn-sm w-100"
                  style={{ borderRadius: "20px" }}
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
