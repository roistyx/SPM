import React from "react";
import NavList from "./NavList";
import FooterLinks from "./FooterLinks";
import "./Footer.css";
import LogoComponent from "../LogoComponent/LogoComponent";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column about">
          <LogoComponent />
          <p className="text">
            Your Health, Our Priority: Personalized Pathology Services at Your
            Convenience.
          </p>
        </div>
        <div className="footer-column contact">
          <span className="title">Contact</span>
          <div class="icon-list">
            <div class="icon-item">
              <img src="icons/call.png" alt="Call Icon" />
              <span>(603) 555-0123</span>
            </div>
            <div class="icon-item">
              <img src="icons/email.png" alt="Email Icon" />
              <span>Arranfood@gmail.com</span>
            </div>
            <div class="icon-item">
              <img src="icons/social.png" alt="Social Icon" />
              <span>Contact us on WhatsApp</span>
            </div>
          </div>
        </div>
        <div className="footer-column navigation">
          <span className="title">Navigation </span>
          <NavList />
        </div>

        <div className="footer-column social">
          <span className="title">Social Media</span>
          <div class="icon-list">
            <div class="icon-item">
              <img src="icons/Facebook.png" alt="Call Icon" />
              <span>Facebook</span>
            </div>
            <div class="icon-item">
              <img src="icons/Linkedin.png" alt="Email Icon" />
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
