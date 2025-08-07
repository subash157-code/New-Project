import React, { useEffect, useState } from "react";
import { useCart } from './CartContext.jsx';
import { useNavigate ,useLocation } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "./StyleFile/Course.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);
const API = "http://localhost:5000/api";

const Courses = () => {
  const [categories, setCategories] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [backendCourses, setBackendCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const { immediateCourses, addCourseToCart } = useCart();
  const navigate = useNavigate();
    const location = useLocation();
useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });

    fetch("/Course.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load course data", err));

    fetch("/Team.json")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.log("Failed to load team data", err));
  }, []);

  useEffect(() => {
    if (activeSection === "newcourse") {
      fetchCourses();
    }
  }, [activeSection]);

const fetchCourses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/courses");
    setBackendCourses(res.data || []);
  } catch (err) {
    console.error("Failed to fetch courses:", err);
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToDemoClass = () => {
    navigate("/demo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/userdetails", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", mobile: "" });
    } catch (err) {
      console.log("Form submission failed:", err);
      alert("Submission failed. Please try again later.");
    }
  };

  const handleImmediateBook = (course) => {
    if (immediateCourses.length < 3) {
      addCourseToCart(course);
      navigate(`/onlinebook/${course.id}`);
    } else {
      alert("You can only add up to 3 courses.");
    }
  };

  return (
    <div id="demo-form-section">
      <p className="Home-Icon-Name">
        {"COURSES".split("").map((char, index) => (
          <span
            className="multi-anim-letter"
            style={{ animationDelay: `${index * 0.10}s` }}
            key={index}
          >
            {char}
          </span>
        ))}
      </p>

      <div className="toggle-buttons">
        <button className={activeSection === 'courses' ? 'active' : ''} onClick={() => setActiveSection('courses')}>Courses</button>
        <button className={activeSection === 'team' ? 'active' : ''} onClick={() => setActiveSection('team')}>Team Members</button>
        <button className={activeSection === 'newcourse' ? 'active' : ''} onClick={() => setActiveSection('newcourse')}>New Course</button>
      </div>

      {activeSection === 'courses' && (
        <div className="courses-section">
          <h2 className="courses-heading" data-aos="fade-in">
            Course powered by&nbsp;<span className="highlight">STUDY</span>
          </h2>

          <p className="courses-subtext" data-aos="fade-right">
            We offer industry-relevant courses from web development to graphic design and more.
          </p>

          {categories.map((cat, i) => (
            <div key={i} className="category-block" data-aos="fade-up" data-aos-delay={i * 50}>
              <h3 className="category-title">{cat.category}</h3>
              <div className="courses-grid">
                {cat.courses.map((course, j) => (
                  <div className="course-card" key={course.id} data-aos="zoom-in" data-aos-delay={j * 150}>
                    <img src={course.image} alt={course.title} className="course-image" />
                    <div className="course-content">
                      <h4 className="course-title">{course.title}</h4>
                      <p className="course-description">{course.description}</p>
                     <div className="btnjoin">
                          <button onClick={() => setShowModal(true)} className="joinNow-btn">
                            Join Now
                          </button>
                          <button onClick={() => handleImmediateBook(course)} className="joinNow-btn confirm-btn">
                            Confirm Book
                          </button>
                          <button className="joinNow-btn demo-btn" onClick={goToDemoClass}>
                            Demo class
                          </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {showModal && (
            <div className="modal-overlay" data-aos="fade-in">
              <div className="modal-container" data-aos="zoom-in">
                <div className="modal-image">
                  <img
                    src="https://mmbaicindia.com/wp-content/uploads/2024/04/teamwork-friendship-join-us-word-concept-scaled.jpg"
                    alt="Join Course"
                  />
                </div>
                <div className="modal-form">
                  <h2>Fill The Details to Reach You</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
                    <div className="button-group">
                      <button type="submit" className="submit-btn">Submit</button>
                      <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === 'team' && (
      <div id="team">
        <div className="team-section">
          <h3 className="sub-heading">
            <span style={{ color: "#0f766e" }}>STUDY'S</span> Official Team
          </h3>
          <p className="contentPro">
            Our official team ensures smooth operations and provides quality training with a professional attitude.
          </p>

          <div className="team-members">
            {teamMembers[0]?.officialTeam?.map((member) => (
              <div key={member.id} className="team-member-card" data-aos="fade-up">
                <div className="TeamDivOne">
                  <img src={member.image} alt={member.name} className="team-member-image" />
                  <div className="TeamContent">
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.experience || member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-heading">
            <span style={{ color: "#0f766e" }}>STUDY'S</span> Professional Trainers
          </h3>
          <p className="contentPro">
            Our expert trainers deliver impactful education in real-world skills.
          </p>

          <div className="team-membersOne">
            {teamMembers[1]?.trainers?.map((trainer, index) => (
              <div key={index} className="team-member-card" data-aos="fade-up">
                <div className="TeamDiv">
                  <img src={trainer.image} alt={trainer.name} className="team-member-image" />
                  <div className="TeamContent">
                    <h3>{trainer.name}</h3>
                    <h4>{trainer.role}</h4>
                    <p>{trainer.bio}</p>
                    <p><strong>"{trainer.quote}"</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
)}

      {activeSection === 'newcourse' && (
        <div className="courses-section">
          <h2 className="courses-heading" data-aos="fade-in">
            Newly Added <span className="highlight">Courses</span>
          </h2>
          <div className="courses-grid">
            {backendCourses.length > 0 ? (
              backendCourses.map((course, i) => (
                <div className="course-card-modern" key={course._id || i} data-aos="zoom-in">
                  <div className="new-course-image">
                  <img
                    src={`${API}/${course.image}`}
                    alt={course.name}
                    className="course-image-modern"
                  />
                  </div>
                  <div className="course-content-modern">
                    <h4 className="course-title-modern">{course.name}</h4>
                    <p className="course-description-modern">
                      {course.description}
                    </p>
                    <div className="course-details-modern">
                      <p>
                        <strong>Duration:</strong> {course.duration}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{course.payment}
                      </p>
                    </div>
                     <div className="btnjoin">
                          <button onClick={() => setShowModal(true)} className="joinNow-btn">
                            Join Now
                          </button>
                          <button onClick={() => handleImmediateBook(course)} className="joinNow-btn confirm-btn">
                            Confirm Book
                          </button>
                          <button className="joinNow-btn demo-btn" onClick={goToDemoClass}>
                            Demo class
                          </button>
                        </div>
                    </div>
                  </div>
              ))
            ) : (
              <p style={{ padding: "1rem" }}>No new courses found.</p>
            )}
          </div>
        </div>
      )}

      <div className="findcourse-container" data-aos="fade-up" >
        <h2 className="findcourse-heading">Finding&nbsp;Course&nbsp;with&nbsp;Expert&nbsp;Guidance</h2>
        <p className="findcourse-description">
          Consider your interests, skills, background, and goals. Let us help you take the right step.
        </p>
        <button
          className="findcourse-button"
          onClick={() => {
            const target = document.getElementById("demo-form-section");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            } else {
              console.warn("Target section not found.");
            }
          }}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Courses;