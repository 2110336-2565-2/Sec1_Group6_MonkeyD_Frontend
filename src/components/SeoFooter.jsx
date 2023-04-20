import React from "react";

const SeoFooter = () => {
  return (
    <div className="seo-footer">
      <div className="contact">
        <img
          src={require("../assets/images/logo.png")}
          alt="logo"
          className="logo"
        />
        <h3>Contact Us</h3>
        <p>Call : +123-4567 890</p>
        <p className="address">
          275 Moo 1 (Phet Kasem Rd), Bang Khae, Bangkok 10160, Thailand.
        </p>
        <p className="email">Email: monkeyDcarrental@gmail.com</p>
        <div className="contact-logo">
          <img
            src={require("../assets/images/fb-logo.png")}
            alt="fb-logo"
            className="fb-logo"
          />
          <img
            src={require("../assets/images/ig-logo.png")}
            alt="ig-logo"
            className="ig-logo"
          />
        </div>
      </div>
      <div className="footer-list">
        <h3>Feature</h3>
        <ul>
          <li>Home</li>
          <li>Become a Host</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="footer-list">
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Press</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-list">
        <h3>Team and policies</h3>
        <ul>
          <li>Terms of services</li>
          <li>Privacy Policy</li>
          <li>Security</li>
        </ul>
      </div>
    </div>
  );
};

export default SeoFooter;
