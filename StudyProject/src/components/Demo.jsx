import React, { useState } from "react";
import axios from "axios";
import "./StyleFile/Demo.css";

export default function Demo() {
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://new-project-backend-hhl0.onrender.com/api/democlass", form);
      if (res.data.success) {
        setSubmitted(true);
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting registration.");
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-left">
        <img
          src="https://img.freepik.com/premium-vector/free-demo-label-flat-design_686319-805.jpg"
          alt="Demo Class"
        />
      </div>
      <div className="demo-right">
        <h2>🎓 Register for a Free Demo Class</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option>Full Stack Web Dev</option>
              <option>Python Programming</option>
              <option>Data Science</option>
            </select>
            <button type="submit">Register</button>
          </form>
        ) : (
          <div className="thank-you">
            ✅ {message}
            <div>
              {form.name}, you have successfully enrolled for <strong>{form.course}</strong> via <strong>{form.email}</strong>!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
