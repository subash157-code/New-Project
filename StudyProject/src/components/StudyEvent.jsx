import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./StyleFile/StudyEvent.css";

const API = "https://new-project-backend-hhl0.onrender.com/api";

const StudyEvent = ({ onBack }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleCardClick = (event) => {
    const now = new Date();
    const deadline = new Date(event.deadlineDate);

    if (now > deadline) {
      toast.warn(`The deadline for "${event.eventName}" has passed.`);
    } else {
      setSelectedEvent(event);
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const dataToSend = {
      ...formData,
      eventName: selectedEvent.eventName,
      deadlineDate: selectedEvent.deadlineDate,
    };

    try {
      await axios.post(`${API}/registration`, dataToSend);
      toast.success(`Registered successfully for "${selectedEvent.eventName}"!`);
      setShowModal(false);
      setFormData({ name: "", email: "", mobile: "" });
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h2 className="section-title">EVENTS</h2>
        <div className="card-container">
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="admin-dashboard">
       
        <h2 className="section-title">EVENTS</h2>
        <div className="card-container">
          <p>No event data available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-dashboard">
      
        <h2 className="section-title">EVENTS</h2>
        <div className="card-container">
          {events.map((event) => (
            <div
              key={event._id}
              className="event-card"
              onClick={() => handleCardClick(event)}
            >
              <img
                src={`${API}/${event.image}`}
                alt={event.eventName}
                className="event-image"
              />
              <div className="event-content">
                <h3 className="event-title">{event.eventName}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-deadline">
                  Deadline: {new Date(event.deadlineDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>
              <FiX />
            </button>
            <h3 className="modal-title">Register for: {selectedEvent.eventName}</h3>
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="submit-button">Register</button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default StudyEvent;
