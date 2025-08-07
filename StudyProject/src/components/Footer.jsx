import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./StyleFile/Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-about">
          <h3 className="footer-logo">STUDY</h3>
          <p>
            Empowering learners to achieve more with expert guidance, flexible courses,
            and real-world skills that unlock careers.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/course">Course&Team</a></li>
            <li><a href="/contact">Contact</a></li>
             <li><a href="/coursequizz">Quizz</a></li>
            <li><a href="/onlineclass">Online Class</a></li>
            <li><a href="/studyevent">Apply Contest</a></li>
            <li><a href="/gallery">Gallery</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Courses Category</h4>
          <ul>
            <li><a href="/course"> Artificial Intelligence</a></li>
            <li><a href="/course">Cloud Computing</a></li>
            <li><a href="/course-center">Cyber Security</a></li>   
            <li><a href="/course">Networking</a></li>
            <li><a href="/course">Server</a></li>
            <li><a href="/course">Software Development</a></li>
          </ul>
        </div>
       

        {/* Right Section - Social Icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} STUDY | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
