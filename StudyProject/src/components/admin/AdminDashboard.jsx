import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiX,
  FiCheck,
  FiPlus,
} from "react-icons/fi";
import "../StyleFile/Admin.css";

const API = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editData, setEditData] = useState({});
  const [formType, setFormType] = useState("");
  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    AOS.init({ duration: 300 });
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/dashboard`);
      setDashboard(res.data);
      toast.success("Dashboard loaded");
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let endpoint = "";

    if (formType === "gallery") {
      endpoint = `${API}/galleries`;
    } else {
      endpoint = `${API}/${formType}s`;
    }

    if (formType === "course") {
      formData.append("name", newEntry.name || "");
      formData.append("duration", newEntry.duration || "");
      formData.append("payment", newEntry.payment || "");
      formData.append("description", newEntry.description || "");
      if (newEntry.image) formData.append("image", newEntry.image);
    } else if (formType === "gallery") {
      formData.append("title", newEntry.title || "");
      formData.append("description", newEntry.description || "");
      formData.append("captureDate", newEntry.captureDate || "");
      formData.append("captureTime", newEntry.captureTime || "");
      if (newEntry.images) {
        Array.from(newEntry.images).forEach((img) =>
          formData.append("images", img)
        );
      }
    } else if (formType === "event") {
      formData.append("eventName", newEntry.title || "");
      formData.append("description", newEntry.description || "");
      formData.append("deadlineDate", newEntry.date || "");
      if (newEntry.image) formData.append("image", newEntry.image);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(endpoint, formData, config);
      toast.success(
        `${formType.charAt(0).toUpperCase() + formType.slice(1)} added`
      );
      fetchDashboard();
      setNewEntry({});
      setFormType("");
    } catch (error) {
      console.error(`Failed to add ${formType}:`, error);
      toast.error(`Failed to add ${formType}`);
    }
  };

  const handleDelete = async (section, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const endpoint = section === 'galleried' ? 'galleries' : section;
      await axios.delete(`${API}/${endpoint}/${id}`);
      toast.success("Item deleted");
      fetchDashboard();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setEditData(item);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditData({});
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in editData) {
        if (key !== "image" && key !== "images") {
          formData.append(key, editData[key]);
        }
      }
      if (editData.image instanceof File) formData.append("image", editData.image);
      if (Array.isArray(editData.images)) {
        editData.images.forEach((file) => {
          if (file instanceof File) formData.append("images", file);
        });
      }

      const endpoint = activeSection === 'galleried' ? 'galleries' : activeSection;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`${API}/${endpoint}/${editingItemId}`, formData, config);

      toast.success("Item updated");
      setEditingItemId(null);
      setEditData({});
      fetchDashboard();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    }
  };

  const renderForm = () => {
    if (!formType) return null;

    return (
      <form onSubmit={handleAddEntry} className="form-section" data-aos="fade-up">
        <h3 className="form-title">
          Add New {formType.charAt(0).toUpperCase() + formType.slice(1)}
        </h3>
        {formType === "course" && (
          <>
            <input
              type="text"
              placeholder="Course Name"
              value={newEntry.name || ""}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={newEntry.duration || ""}
              onChange={(e) =>
                setNewEntry({ ...newEntry, duration: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Payment Amount"
              value={newEntry.payment || ""}
              onChange={(e) => setNewEntry({ ...newEntry, payment: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={newEntry.description || ""}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
              required
            />
            <input
              type="file"
              onChange={(e) =>
                setNewEntry({ ...newEntry, image: e.target.files[0] })
              }
            />
          </>
        )}

        {formType === "gallery" && (
          <>
            <input
              type="text"
              placeholder="Gallery Title"
              value={newEntry.title || ""}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={newEntry.description || ""}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={newEntry.captureDate || ""}
              onChange={(e) =>
                setNewEntry({ ...newEntry, captureDate: e.target.value })
              }
            />
            <input
              type="file"
              multiple
              onChange={(e) => setNewEntry({ ...newEntry, images: e.target.files })}
            />
          </>
        )}

        {formType === "event" && (
          <>
            <input
              type="text"
              placeholder="Event Title"
              value={newEntry.title || ""}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={newEntry.description || ""}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
              required
            />
            <input
              type="date"
              placeholder="Event Date"
              value={newEntry.date || ""}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              required
            />
            <input
              type="file"
              onChange={(e) =>
                setNewEntry({ ...newEntry, image: e.target.files[0] })
              }
            />
          </>
        )}
        <div className="form-actions">
          <button type="submit" className="save-button">
            <FiCheck /> Add
          </button>
          <button type="button" onClick={() => setFormType("")} className="cancel-button">
            <FiX /> Cancel
          </button>
        </div>
      </form>
    );
  };

  const renderTable = (items, section) => {
    if (!items || items.length === 0) {
      return (
        <div className="empty-state">No entries found for {section}.</div>
      );
    }
    const keys = Object.keys(items[0]).filter((k) => k !== "_id" && k !== "__v");

    const renderTableCell = (item, key) => {
      if (editingItemId === item._id && key !== "image" && key !== "images") {
        return (
          <input
            type="text"
            className="edit-input"
            value={editData[key] || ""}
            onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
          />
        );
      }

      if (key === "answers" && typeof item.answers === "object") {
        return (
          <div className="chat-answers-container">
            {Object.entries(item.answers).map(([question, answer], index) => (
              <div key={index} className="chat-answer-item">
                <strong>{question}:</strong> {answer}
              </div>
            ))}
          </div>
        );
      }

      if (key === "image" && item.image) {
        return (
          <img
            src={`${API}/${item.image}`}
            alt="Item"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        );
      }
      if (key === "images" && item.images) {
        return (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {item.images.map((img, idx) => (
              <img
                key={idx}
                src={`${API}/${img}`}
                alt={`Gallery Img ${idx}`}
                style={{ maxWidth: "80px", maxHeight: "80px", margin: "4px" }}
              />
            ))}
          </div>
        );
      }

      if (["createdAt", "date", "deadlineDate", "captureDate"].includes(key)) {
        return new Date(item[key]).toLocaleString();
      }

      return item[key];
    };

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {keys.map((key) => (
                  <td key={key}>{renderTableCell(item, key)}</td>
                ))}
                <td className="table-actions">
                  {editingItemId === item._id ? (
                    <>
                      <button onClick={handleSaveEdit} title="Save">
                        <FiCheck />
                      </button>
                      <button onClick={handleCancelEdit} title="Cancel">
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FiEdit />
                      </button>
                      <button onClick={() => handleDelete(section, item._id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) return <p>Loading dashboard...</p>;

  const renderDashboardContent = () => {
    if (activeSection) {
      const items = dashboard[activeSection] || [];
      return (
        <div data-aos="fade-in">
          <button className="back-button" onClick={() => setActiveSection(null)}>
            <FiArrowLeft /> Back to Dashboard
          </button>
          <h2 className="section-title">{activeSection.toUpperCase()}</h2>
          {renderTable(items, activeSection)}
        </div>
      );
    }

    return (
      <div data-aos="fade-in">
        <h1 className="title">Admin Dashboard</h1>
        <p className="subtitle">Click a section to view and manage entries.</p>
        <div className="summary-cards">
          {Object.entries(dashboard).map(([section, items]) => (
            <div
              key={section}
              className="summary-card"
              onClick={() => setActiveSection(section)}
            >
              <h2>{section.toUpperCase()}</h2>
              <p>Total items: {items.length}</p>
            </div>
          ))}
        </div>
        <div className="add-buttons">
          <button onClick={() => setFormType("course")}>
            <FiPlus /> Add New Course
          </button>
          <button onClick={() => setFormType("gallery")}>
            <FiPlus /> Add New Gallery
          </button>
          <button onClick={() => setFormType("event")}>
            <FiPlus /> Add New Event
          </button>
        </div>
        {renderForm()}
      </div>
    );
  };

  return (
    <>
      <div className="admin-dashboard">{renderDashboardContent()}</div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default AdminDashboard;