import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./StyleFile/About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/About.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to load About.json:", err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  const aboutInfo = aboutData[0];
  const logoInfo = aboutData[1];
  const statsInfo = aboutData[2].stats;

  return (
   <div className="company-scroller-wrapper">
      {/* ABOUT SECTION */}
      <div className="about-section" data-aos="fade-up" data-aos-delay="0">
        <div className="about-left" data-aos="fade-right" data-aos-delay="100">
          <img src={aboutInfo.image} alt="About" className="about-image" />
        </div>

        <div className="about-right" data-aos="fade-left" data-aos-delay="300">
          <h2 className="about-title">{aboutInfo.title}</h2>
          <p className="about-description">{aboutInfo.description}</p>

          <h3 className="service-title" data-aos="fade-up" data-aos-delay="400">
            {aboutInfo.servicesTitle}
          </h3>
          <p className="about-description" data-aos="fade-up" data-aos-delay="500">
            {aboutInfo.services}
          </p>

          <h3 className="company-scroller-title" data-aos="fade-up" data-aos-delay="600">
            {logoInfo.titleLogo}
          </h3>
          <div className="company-track" data-aos="zoom-in" data-aos-delay="700">
            {logoInfo.logos.concat(logoInfo.logos).map((logo, index) => (
              <div
                className="company-logo"
                key={index}
                data-aos="fade-up"
                data-aos-delay={800 + index * 100}
              >
                <img src={logo} alt={`Company ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLASSROOM EXPERIENCE */}
      <div className="classroom-section" data-aos="fade-up" data-aos-delay="0">
        <div className="classroom-left" data-aos="fade-right" data-aos-delay="200">
          <h2 className="classroom-title">
            Our Classroom <span className="abouthighlight">Experience</span>
          </h2>
          <p className="classroom-description">
            There is a widespread digital transformation happening across industry sectors through
            emerging technologies in Virtualization, Automation, AI, IoT, and more. Get your tech arsenal
            sharpened here with STUDY in our classroom to propel high in this competitive market.
          </p>
          <p className="classroom-description">
            Our in-house resource pool is proficient with the latest technologies and we guarantee to
            make each candidate placement ready.
          </p>
        </div>

        <div className="classroom-right" data-aos="fade-left" data-aos-delay="300">
          <img
            src="https://www.xploreitcorp.com/wp-content/uploads/2025/03/1-4.webp"
            alt="Classroom"
            className="classroom-image"
          />
        </div>
      </div>

      {/* STATS SECTION */}
      <h2 className="statsclassroom-title" data-aos="fade-right" data-aos-delay="100">
        Our <span className="abouthighlight">Experience</span>
      </h2>
      <div className="stats-grid">
        {statsInfo.map((stat, index) => (
          <div
            className="stat-card"
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
          >
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* TECH SKILLS SECTION */}
      <div className="techskills-section" data-aos="fade-up" data-aos-delay="0">
        <div className="techskills-left" data-aos="fade-right" data-aos-delay="100">
          <img
            src="https://www.xploreitcorp.com/wp-content/uploads/2025/03/2-3.webp"
            alt="Tech Skill"
            className="techskills-image"
          />
        </div>

        <div className="techskills-right" data-aos="fade-left" data-aos-delay="200">
          <h2 className="techskills-title">
            Tech <span className="abouthighlight">Skill</span>
          </h2>
          <p className="techskills-description">
            The future is here. Move along faster with the advancement in technologies happening in a blink of an eye. A technical skill along with your academics can make you stand out from the crowd and get an extra mileage towards the doors of your career. Our tech experts would cater the in-demand technologies to you at our campus.
          </p>
          <p className="techskills-description">
            We are committed to train you to match the requirements of the industry and carve you in such a way that you are 100 percent placement-ready and waiting to grab a suitable opportunity. Supports such as Internships, Self-made projects, and Startup support will be provided seamlessly.
          </p>
        </div>
      </div>

      {/* FLY-ME-A TRAINER SECTION */}
      <div className="classroom-section" data-aos="fade-up" data-aos-delay="0">
        <div className="classroom-left" data-aos="fade-right" data-aos-delay="200">
          <h2 className="classroom-title">
            Fly-Me-A <span className="abouthighlight">Trainer</span>
          </h2>
          <p className="classroom-description">
          Up-skill, Re-Skill, Cross-skill, Expert-skill your workforce? We STUDY are experts in that. We have the most talented tech team to provide both technical and non-technical IT training for both individuals and enterprise teams. With reskilling has taken precedence as a key strategic business objective to ensure continuous learning for the workforce, it is critical for enterprises to provide corporate training programs on the latest technologies and frameworks.
          </p>
          <p className="classroom-description">
           With teams spread across the globe, different individuals have different learning needs, and Xplore IT Corp can be your training partner to deliver corporate training courses across various learning modes.
          </p>
        </div>

        <div className="classroom-right" data-aos="fade-left" data-aos-delay="500">
          <img
            src="https://www.xploreitcorp.com/wp-content/uploads/2025/03/3-3.webp"
            alt="Fly Me Trainer"
            className="classroom-image"
          />
        </div>
      </div>

      {/* AT EASE SECTION */}
      <div className="techskills-section" data-aos="fade-up" data-aos-delay="100">
        <div className="techskills-left" data-aos="fade-right" data-aos-delay="500">
          <img
            src="https://api.hindustanuniv.ac.in/uploads/3_44f219ffa6.jpg"
            alt="At Ease"
            className="techskills-image"
          />
        </div>
        <div className="techskills-right" data-aos="fade-left" data-aos-delay="600">
          <h2 className="techskills-title">At <span className="abouthighlight">Ease</span></h2>
          <p className="techskills-description">
           Learn at your ease anywhere and anytime through our online training programs. Online training programs will be self-paced, interactive, and provide hands-on support by a virtual instructor. Online training is designed in such a way to suit the abilities of the student.
          </p>
          <p className="techskills-description">
            This is the best solution for busy professionals who find it difficult to travel or dedicate time to classroom learning. Our virtual lab can give you access to multiple software and tools. Recorded sessions can be useful for future references and a dedicated resource to address all your queries Promptly and Professionally.
          </p>
        </div>
      </div>

      {/* TRAIN AND HIRE SECTION */}
      <div className="classroom-section" data-aos="fade-up" data-aos-delay="100">
        <div className="classroom-left" data-aos="fade-right" data-aos-delay="700">
          <h2 className="classroom-title">
            Train and <span className="abouthighlight">Hire</span>
          </h2>
          <p className="classroom-description">
           Train and Hire is the popular and new hiring model of recruitment followed by top companies of any domain. This model is followed in order to save the time and the cost involved. Matching the matrix of company requirements and candidate skill sets is the objective.
          </p>
          <p className="classroom-description">
           STUDY has a dedicated team to work for this Train and Hire. With a motto of providing opportunities to the deserving, the team is working predominantly focussing not only urban but rural as well. Maximum Companies with refined opportunities for the students will be the mission and vision.
          </p>
        </div>

        <div className="classroom-right" data-aos="fade-left" data-aos-delay="800">
          <img
            src="https://www.xploreitcorp.com/wp-content/uploads/2025/03/15-1.webp"
            alt="Train and Hire"
            className="classroom-image"
          />
        </div>
      </div>

      {/* ALUMNI SECTION */}
      <div className="techskills-section" data-aos="fade-up" data-aos-delay="100">
        <div className="techskills-left" data-aos="fade-right" data-aos-delay="800">
          <img
            src="https://indrainstitute.com/wp-content/uploads/2025/05/category1.jpg"
            alt="Alumni"
            className="techskills-image"
          />
        </div>
        <div className="techskills-right" data-aos="fade-left" data-aos-delay="1000">
          <h2 className="techskills-title">
            What our <span className="abouthighlight">Alumni Say?</span>
          </h2>
          <p className="techskills-description">
          Welcome to Indra Institute of Education (STUDY), a leading educational institution established in 2011.
          </p>
          <p className="techskills-description">
             With strategic partnerships with PSI Assessment and Attest Testing, and ISO 9001:2015 certification, we offer top-notch training in software development including full stack java, python, web development, selenium, Django, azure, AI, android development, networking, CCNA, and excel.  the first step towards a brighter future in technology.Our alumni credit our trainers, curriculum, and support system for helping them launch top careers.
          </p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="findcourse-container" data-aos="fade-up"  >
        <h2 className="findcourse-heading">Finding Your Right Courses</h2>
        <p className="findcourse-description">
         It is important to consider various factors such as your interests, skills, academic background, and future aspirations. Researching the different options available and seeking advice.
        </p>
        <button className="findcourse-button" onClick={() =>{ navigate("/course")}}>Get Started Now</button>
      </div>
    </div>
  );
};

export default About;
