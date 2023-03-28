import React from "react";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
import adminjpg from "../../images/admin.jpg";
import "./about.scss";

function About() {
  return (
    <div className="about">
      <div className="about-img">
        <img src={adminjpg} alt={"Founder img"} />
      </div>

      <div className="about-description">
        <h2>About Us</h2>
        <div>
          <p>
            Welcome to Shop.io, an e-commerce website created by a Alfe Sunny
            Mallick pursuing Information technology (IT) at Bengal Institute of
            Technology.
            <br />
            At Shop.io, we aim to offer our customers the best online shopping
            experience, with a wide range of products and services that cater to
            their every need. Our website is designed to be user-friendly, easy
            to navigate, and accessible to everyone.
            <br />
            As a final year student, I have gained valuable knowledge and
            experience that has helped me develop this website. I have worked
            tirelessly to ensure that every aspect of the website is functional,
            reliable, and secure. I believe that this website is a reflection of
            my dedication and hard work, and I am confident that it will exceed
            your expectations. Thank you for choosing Shop.io. We hope you enjoy
            your shopping experience with us, and we look forward to serving you
            again in the future.
            <br />
            Thank you for choosing Shop.io. We hope you enjoy your shopping
            experience with us, and we look forward to serving you again in the
            future.
          </p>
          <section>
            <Link to="https://github.com/thesunnymallick" target="blank">
              <AiOutlineGithub />
            </Link>
            <Link
              to="https://www.linkedin.com/in/thesunnymallick/"
              target="blank"
            >
              <AiOutlineLinkedin />
            </Link>
            <Link
              to="https://www.instagram.com/themallicksunny/"
              target="blank"
            >
              <AiOutlineInstagram />
            </Link>
            <Link to="https://thesunnymallick.vercel.app/" target="blank">
              <BiWorld />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
