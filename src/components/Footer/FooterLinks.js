import React from "react";
import "./FooterLinks.css";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <span className="footer-link">
        &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
      </span>
      <a href="/privacy-policy" className="footer-link">
        {" "}
        Privacy Policy
      </a>
      <a href="/terms-of-service" className="footer-link">
        Terms of Service
      </a>
      <a href="/cookies-settings" className="footer-link">
        Cookies Settings
      </a>
    </div>
  );
};

export default FooterLinks;
