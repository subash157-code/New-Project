// src/components/OnlineClass.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StyleFile/OnlineClass.css";

const OnlineClass = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Using GET: backend must have app.get('/api/paymentbooking')
      const res = await axios.get("https://new-project-backend-hhl0.onrender.com/api/paymentbooking", {
        params: {
          username: formData.username,
          password: formData.password,
        },
      });

      if (res.data.success) {
        alert("✅ Login successful!");
        setUserInfo(res.data.user);
        navigate("/classdashboard", { state: { user: res.data.user } });

        await axios.post("https://new-project-backend-hhl0.onrender.com/api/Logininfo", {
          username: formData.username,
          password: formData.password,
          date: new Date().toISOString(),
        });
      } else {
        alert("❌ Invalid username or password.");
        setUserInfo(null);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="image-section" />
      <div className="login-section">
        <div className="login-box">
          <h2>Login to Your Class</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>

          {userInfo && (
            <div className="user-info">
              <h3>📘 Your Booking Info</h3>
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Course:</strong> {userInfo.courseTitle}</p>
              <p><strong>Appointment:</strong> {userInfo.appointmentDate} at {userInfo.timing}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineClass;
