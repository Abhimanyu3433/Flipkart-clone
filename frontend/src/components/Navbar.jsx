import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            flipkart<span style={{ fontSize: "0.7rem" }}>.clone</span>
          </Link>
        </div>
        <div className="navbar-search">
          <input placeholder="Search for products" />
        </div>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span>Hello, {user.name.split(" ")[0]}</span>
            <span className="nav-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login" className="nav-link" style={{ color: "white" }}>
            Login
          </Link>
        )}

        <Link
          to="/cart"
          className="nav-link"
          style={{ color: "white", display: "flex", alignItems: "center" }}
        >
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
