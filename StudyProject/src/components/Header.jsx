// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { GrGallery } from 'react-icons/gr';
import { GiTrophyCup } from 'react-icons/gi';
import { FaVideo, FaRocketchat, FaBars, FaTimes } from 'react-icons/fa';
import ChatBot from './ChatBox';
import './StyleFile/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleStudyClick = () => navigate('/admin/login');
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
  }, [isSidebarOpen]);

  return (
    <>
      <header className="header">
        <div className="header-left" onClick={handleStudyClick} title="Click to login as admin">
          <p className="header-Name">
            {'Study'.split('').map((char, index) => (
              <span key={index} className="jumping-letter" style={{ animationDelay: `${index * 0.1}s` }}>
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About&nbsp;Us</NavLink></li>
            <li><NavLink to="/course" className={({ isActive }) => isActive ? "active-link" : ""}>Courses&nbsp;&amp;&nbsp;Team</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact&nbsp;Us</NavLink></li>
            <li><NavLink to="/coursequiz" className={({ isActive }) => isActive ? "active-link" : ""}>Quizz</NavLink></li>
          </ul>
            <div className="sidebar-icons">
          <Link to="/studyevent" onClick={closeSidebar}><GiTrophyCup className="sidebar-icon" /></Link>
          <Link to="/gallery" onClick={closeSidebar}><GrGallery className="sidebar-icon" /></Link>
          <Link to="/onlineclass" onClick={closeSidebar}><FaVideo className="sidebar-icon" /></Link>
          <FaRocketchat className="sidebar-icon" onClick={() => { setShowChat(true); closeSidebar(); }} />
        </div>
        </nav>

        {/* Toggle Button (Only Mobile) */}
        <div className="menu-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FaTimes className="sidebar-close-icon" onClick={closeSidebar} />
        </div>
        <ul className="sidebar-nav-list">
          <li><NavLink to="/" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-sidebar-link" : ""}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-sidebar-link" : ""}>About Us</NavLink></li>
          <li><NavLink to="/course" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-sidebar-link" : ""}>Courses & Team</NavLink></li>
          <li><NavLink to="/contact" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-sidebar-link" : ""}>Contact Us</NavLink></li>
          <li><NavLink to="/coursequiz" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-sidebar-link" : ""}>Quizz</NavLink></li>
        </ul>

        <div className="sidebar-icons">
          <Link to="/studyevent" onClick={closeSidebar}><GiTrophyCup className="sidebar-icon" /></Link>
          <Link to="/gallery" onClick={closeSidebar}><GrGallery className="sidebar-icon" /></Link>
          <Link to="/onlineclass" onClick={closeSidebar}><FaVideo className="sidebar-icon" /></Link>
          <FaRocketchat className="sidebar-icon" onClick={() => { setShowChat(true); closeSidebar(); }} />
        </div>
      </aside>

      {/* Backdrop */}
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </>
  );
};

export default Header;
