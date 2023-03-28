import React from "react";
import "./footer.scss";
import { SocialIcons } from "../Header/MobileNavBar";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
function Footer() {
  return (
    <>
      <div className="footer">
        <section className="footer-1">
          <div>
            <Link to="/">
              <h1>Shop</h1>
              <span>.io</span>
            </Link>
          </div>
          <div>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </section>

        <section className="footer-2">
          <div className="footer-2-1">
            <h1>Contact us</h1>
            <p>Chandai, Borjora </p>
            <p>Bankura, WestBengal</p>
            <p>722208</p>
            <p>+916297179586</p>
            <p>alfesunnymallick800@gmail.com</p>

            <div className="socil-icon">
              {SocialIcons.map((i, index) => (
                <a href={i.url} key={index} target="blank">
                  {i.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-2-2">
            <h1>infromation</h1>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Refund Policy</Link>
            <Link to="/">Shipping Policy</Link>
            <Link to="/">Terms & Conditions</Link>
            <Link to="/">Blogs</Link>
          </div>
          <div className="footer-2-3">
            <h1>Account</h1>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <HashLink to="/#services">Services</HashLink>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-2-4">
            <h1>Quick Links</h1>
            <Link to="/products">Laptop</Link>
            <Link to="/products">Headphone</Link>
            <Link to="/products">Phone</Link>
            <Link to="/products">Watch</Link>
          </div>
        </section>
        <section className="footer-3">
          <p> ©2023:Powered by Sunny Mallick</p>
        </section>
      </div>
    </>
  );
}

export default Footer;
