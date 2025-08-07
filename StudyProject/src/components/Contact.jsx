import React, { useState } from 'react';
import './StyleFile/Contact.css';
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://new-project-backend-hhl0.onrender.com/contact", formData);
    if (response.status === 201) {
      alert("Thank you for contacting us!");
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
    }
  } catch (error) {
    console.error("Error sending contact message:", error);
    alert("Failed to send message. Please try again later.");
  }
};

  return (
    <>
     <h2 className='ContactHeading'>Participate in Our Study Events</h2>
    <p style={{textAlign:"center",marginBottom:"50px",fontSize:"17px"}}>revising for exams or preparing for a contest, each moment you invest in learning shapes your future. Studying is not just about memorizing facts; it’s about building confidence, discipline, and a mindset that refuses to settle. Contests aren’t just competitions — they’re stepping stones to discover your strengths, challenge your limits, and grow beyond the classroom. So show up, stay committed, and remember: you don’t need to be perfect — you just need to keep showing up, improving one step at a time. Because greatness begins with a single focused effort.</p> 
    <div className="contact-container">
      <h2 className="contact-heading">Let's Get You Started!</h2>
      <p className="contact-tagline">We're here to help you succeed in your studies. Drop us a message and we'll reach out!</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="tel" 
          name="mobile" 
          placeholder="Mobile Number" 
          value={formData.mobile} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
     </>
  );
};

export default Contact;
