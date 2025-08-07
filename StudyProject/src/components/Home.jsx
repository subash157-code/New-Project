import React, { useEffect, useState } from "react";
import "./StyleFile/Home.css";
import { TiTickOutline } from "react-icons/ti";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const iconMap = {
  "fa-solid fa-graduation-cap": faGraduationCap,
  "fa-solid fa-certificate": faCertificate
};

const categories = [
  "All",
  "AI",
  "Cloud Computing",
  "Cyber Security",
  "Web Apps",
  "Mobile App Development",
  "Networking",
  "Servers"
];

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [limitData, setLimitData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    if (id === 1) {
      navigate("/course");
    } else if (id === 2) {
      navigate("/certificate");
    } else {
      navigate(`/info/${id}`);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    date: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/Join.json")
      .then((res) => res.json())
      .then((data) => setInfoData(data))
      .catch((err) => console.error("Failed to load JSON:", err));

    fetch("/HomeData.json")
      .then((res) => res.json())
      .then((data) => setHomeData(data));

    fetch("/PopularCourses.json")
      .then((res) => res.json())
      .then((data) => {
        const courseList = data.filter(item => item.category);
        const limitObj = data.find(item => item.Limittitle);
        setCourses(courseList);
        setLimitData(limitObj);
      });

    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://new-project-backend-hhl0.onrender.com/newuser", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", course: "", date: "", message: "" });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again later.");
    }
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  if (!homeData) return <div>Loading...</div>;

  return (
   <div className="company-scroller-wrapper">
      {/* Animated STUDY Text */}
      <p className="Home-Icon-Name">
        {"STUDY".split("").map((char, index) => (
          <span className="multi-anim-letter" style={{ animationDelay: `${index * 0.1}s` }} key={index}>
            {char}
          </span>
        ))}
      </p>

      {/* Home Intro Section */}
      <div className="home-section">
        <div className="home-left" data-aos="fade-right">
          <h1 className="home-title">{homeData.title} <span>{homeData.highlight}</span></h1>
          <h4 className="home-Heading">Welcome to the World of Opportun <span className="itText">IT</span>ies</h4>
          <p className="home-desc">{homeData.description}</p>
          <button className="explore-btn"onClick={() =>{ navigate("/course")}}>{homeData.buttonText}</button>

          <div className="home-stats">
            {homeData.stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="home-right" data-aos="fade-left">
          <img src={homeData.image} alt="Study Training" className="home-image" />
        </div>
      </div>

      {/* Demo Booking Form */}
      <div className="demo-section">
        <div className="demo-left-form" data-aos="fade-right">
          <h2 className="home-Heading">{homeData.formtitle}</h2>
          <form onSubmit={handleSubmit} className="demo-form">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
            <input name="course" value={formData.course} onChange={handleChange} placeholder="Course Interested" required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Enter your message or query..." required></textarea>
            <div className="buttondivfrom">
              <button type="submit">Book Now</button>
              <button type="button" onClick={() => setFormData({ name: "", email: "", course: "", date: "", message: "" })}>Cancel</button>
            </div>
          </form>
          {submitted && <p className="success-msg">🎉 Thank you! Your demo class is booked.</p>}
        </div>

        <div className="demo-right-content" data-aos="fade-left">
          <p className="home-Heading">{homeData.subtext}</p>
          <div className="demo-paragraphs">
            {["Technical", "General", "Motivational"].map((type, i) => (
              <div className="TechContent" data-aos="fade-up" data-aos-delay={100 * (i + 1)} key={i}>
                <p className="FontHeading">{type}</p>
                <p><TiTickOutline /> {homeData[type]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promises Section */}
      <h2 className="why-titleChoose" style={{ textAlign: "center", margin: "1%" }} data-aos="fade-left" data-aos-delay="400">
        Our <span className="highlight-text">Promises</span>
      </h2>
      <div className="benefits-section" data-aos="fade-right" data-aos-delay="500">
        {homeData.benefits.map((benefit, index) => (
          <div className="benefit-wrapper" key={index}>
            <div className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <h5 className="benefit-destitle">{benefit.desTitle}</h5>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-section" data-aos="fade-left" data-aos-delay="600">
        <h2 className="why-title">Why Choose <span className="highlight-text">STUDY</span>?</h2>
        <div className="why-content-grid" data-aos="fade-up" data-aos-delay="700">
          {homeData.choosen.map((item) => (
            <div className="why-card" key={item.id}>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="course-section">
        <h2 className="why-title" style={{ textAlign: "center" }} data-aos="fade-zoom" data-aos-delay="700">
          Popular <span className="highlight-text">Courses</span>
        </h2>
        <div className="category-buttons" data-aos="fade-up" data-aos-delay="700">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card" data-aos="fade-up" data-aos-delay="800">
              <div className="courseImage">
                <img src={course.image} alt={course.title} className="InsideCourseImage" />
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span className="duration">🕒 {course.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Limitless Learning Section */}
      {limitData && (
        <div className="limitless-section" data-aos="fade-up" data-aos-delay="900">
          <div className="limitless-left">
            <h2 className="limitless-title">
              {limitData.Limittitle.split(" ").map((word, i) =>
                word.toLowerCase().includes("limitless") ? (
                  <span key={i} className="highlight">{word} </span>
                ) : (
                  word + " "
                )
              )}
            </h2>
            <p className="limitless-description">{limitData.Limitdescription}</p>
            <button className="limitless-btn" onClick={() => { navigate("/course") }}>{limitData.LimitbuttonText}</button>
          </div>
          <div className="limitless-right">
            <img src={limitData.Limitimages} alt="" className="limitless-image" data-aos="fade-left" data-aos-delay="900" />
          </div>
        </div>
      )}

      {/* Expert Course Help Section */}
      <div className="choose-course-section" data-aos="fade-up" data-aos-delay="1000">
        <div className="choose-left">
          <h2 className="choose-heading">
            Confused about <span className="highlight">which course</span> to choose?
          </h2>
          <p className="choose-description">
            No worries! Our expert counselors will guide you in selecting the right path based on your interests, goals, and market trends.
          </p>
        </div>
        <div className="choose-right">
          <button className="choose-btn" onClick={() => navigate("/course?#team")}>
            🚀 Get Know our experts
          </button>
        </div>
      </div>

      {/* Info Cards */}
    <div className="info-cards-container">
      {infoData.map((item) => (
        <div key={item.id} className="info-card" data-aos="fade-up" data-aos-delay={`${item.id * 100}`}>
          <div className="info-icon">
            <FontAwesomeIcon icon={iconMap[item.icon]} size="2x" />
          </div>
          <h2>{item.title}</h2>
          <h3 className="highlight">{item.highlight}</h3>
          <p className="subheading">{item.subheading}</p>
          <p className="description">{item.description}</p>
          <button onClick={() => handleNavigate(item.id)} className="info-button">
            {item.buttonText}
          </button>
        </div>
      ))}
    </div>

      {/* ✅ FIXED — Final Section Showing */}
      <div className="findcourse-container" data-aos="fade-up" >
        <h2 className="findcourse-heading">Finding Your Right Courses</h2>
        <p className="findcourse-description">
          It is important to consider various factors such as your interests, skills, academic background, and future aspirations...
        </p>
        <button className="findcourse-button" onClick={() =>{ navigate("/course")}}>Get Started Now</button>
      </div>
    </div>
  );
};

export default Home;
