import React from "react";
import { Link } from "react-router-dom";
import "./NavList.css";

const NavList = () => {
  return (
    <div className="nav-list">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/appointments" className="nav-item">
        About Us
      </Link>
      <Link to="/appointments" className="nav-item">
        Services
      </Link>
      <Link to="/appointments" className="nav-item">
        FAQs
      </Link>
      <Link to="/book-consultation" className="nav-item">
        Book Consultation
      </Link>
    </div>
  );
};

export default NavList;
