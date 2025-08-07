import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../App"; // adjust path if needed

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(AdminContext); // <-- get setToken from context

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post("https://new-project-backend-hhl0.onrender.com/admin/adminlogin", {
        username,
        password,
      });

      if (res.data.success) {
        // Save login info (optional)
        await axios.post("https://new-project-backend-hhl0.onrender.com/adminlogininfo", {
          username,
          date: new Date().toISOString(),
        });

        // Set token in context — you can store anything, e.g., a dummy token
        setToken("admin-authenticated-token");

        // Navigate to admin dashboard
        navigate("/admin/admindashboard");
      } else {
        setError("❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error during login");
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
