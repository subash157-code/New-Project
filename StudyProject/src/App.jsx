// App.jsx
import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import About from "./components/About";
import Course from "./components/Course";
import { CartProvider } from "./components/CartContext.jsx";
import OnlineBook from "./components/OnlineBook";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import StudyEvents from "./components/StudyEvent";
import OnlineClass from "./components/OnlineClass";
import ClassDashboard from "./components/ClassDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import DemoClass from "./components/Demo";
import ChatBox from "./components/ChatBox";
import CourseQuiz from "./components/CourseQuiz";
import RainbowTrailEffect from "./components/RainbowTrailEffect";
import CertificateList from "./components/CertificateList";


export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [token, setToken] = useState("");
  return <AdminContext.Provider value={{ token, setToken }}>{children}</AdminContext.Provider>;
};

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AdminContext);
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <AdminProvider>
        <CartProvider>
          <RainbowTrailEffect />
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/course" element={<Course />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/studyevent" element={<StudyEvents />} />
            <Route path="/classdashboard" element={<ClassDashboard />} />
            <Route path="/demo" element={<DemoClass />} />
            <Route path="/chatbox" element={<ChatBox />} />
            <Route path="/coursequiz" element={<CourseQuiz />} />
            <Route path="/certificate" element={<CertificateList />} />
            <Route path="/onlineclass" element={<OnlineClass />} />
            <Route path="/onlinebook/:id" element={<OnlineBook />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/admindashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>

          <Footer />
        </CartProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
