import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StyleFile/Gallery.css";

const API = "https://new-project-backend-hhl0.onrender.com/api";

// Slideshow view component
const GalleryView = ({ title, description, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-view-overlay" data-aos="fade-in">
      <div className="gallery-view-slideshow-container" data-aos="zoom-in">
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>

        <div className="slideshow-image-container">
          <img
            src={`${API}/${images[currentIndex]}`}
            alt={`${title} - ${currentIndex}`}
            className="slideshow-image"
          />
          <button className="nav-button prev" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="nav-button next" onClick={handleNext}>
            &#10095;
          </button>
        </div>

        <div className="slideshow-info">
          <h3 className="view-title">{title}</h3>
          <p className="view-description">{description}</p>
          <p className="image-counter">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>

        <div className="thumbnail-row">
          {images.map((img, index) => (
            <img
              key={index}
              src={`${API}/${img}`}
              className={`thumbnail-image ${
                index === currentIndex ? "active-thumb" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              alt={`Thumbnail ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main gallery component
const Gallery = ({ onBack }) => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 300 });
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/galleries`);

      const grouped = {};
      res.data.forEach((item) => {
        if (!grouped[item.title]) {
          grouped[item.title] = {
            title: item.title,
            description: item.description,
            images: [...item.images],
          };
        } else {
          grouped[item.title].images.push(...item.images);
        }
      });

      setGalleries(Object.values(grouped));
      toast.success("Galleries loaded successfully!");
    } catch (err) {
      console.error("Failed to fetch galleries:", err);
      toast.error("Failed to load galleries.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleCloseView = () => {
    setSelectedGallery(null);
  };

  if (loading) return <p>Loading galleries...</p>;

  if (galleries.length === 0) {
    return (
      <div className="admin-dashboard" data-aos="fade-in">
        <button className="back-button" onClick={onBack}>
          <FiArrowLeft /> Back 
        </button>
        <div className="empty-state">No gallery items found.</div>
      </div>
    );
  }

  if (selectedGallery) {
    return (
      <GalleryView
        title={selectedGallery.title}
        description={selectedGallery.description}
        images={selectedGallery.images}
        onClose={handleCloseView}
      />
    );
  }

  return (
    <div className="admin-dashboard" data-aos="fade-in">
      <button className="back-button" onClick={onBack}>
        <FiArrowLeft /> Back 
      </button>
      <h2 className="section-title">Gallery Preview</h2>

      {galleries.map((gallery, index) => (
        <div key={index} className="gallery-section-container">
          <div className="gallery-card-header" data-aos="fade-right">
            <h3 className="section-title">{gallery.title}</h3>
            <p className="gallery-description">{gallery.description}</p>
          </div>
          <div className="gallery-grid-by-title">
            {gallery.images.slice(0, 3).map((image, idx) => (
              <div
                key={idx}
                className="gallery-image-card"
                data-aos="fade-up"
                onClick={() => handleCardClick(gallery)}
              >
                <img
                  src={`${API}/${image}`}
                  alt={`${gallery.title} - ${idx}`}
                  className="gallery-image-single"
                />
              </div>
            ))}
            {gallery.images.length > 3 && (
              <div
                className="gallery-image-card more-button"
                data-aos="fade-up"
                onClick={() => handleCardClick(gallery)}
              >
                <p>+{gallery.images.length - 3} more</p>
              </div>
            )}
          </div>
        </div>
      ))}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Gallery;
