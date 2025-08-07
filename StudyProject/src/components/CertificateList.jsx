import React, { useEffect, useState } from "react";
import "./StyleFile/Certificate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiX, FiDownload } from "react-icons/fi";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/Certificate.json")
      .then((res) => res.json())
      .then((data) => setCertificates(data));

    AOS.init({ duration: 800 });

    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "medium"
    });
    setCurrentTime(formatted);
  }, []);

  return (
    <div className="certificate-container">
      <h2 className="cert-title" data-aos="fade-down"> Verified Certificates</h2>
      <p className="cert-time" data-aos="fade-down" data-aos-delay="100"> Viewed on: {currentTime}</p>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div className="cert-card" key={cert.id} data-aos="fade-up">
            <img
              src={cert.image}
              alt={cert.title}
              className="cert-image"
              onClick={() => setSelectedImage(cert.image)}
              style={{ cursor: "pointer" }}
            />
            <div className="cert-content">
              <h3>{cert.title}</h3>
              <p><strong>Category:</strong> {cert.category}</p>
              <p><strong>Duration:</strong> {cert.duration}</p>
              <p><strong>Issued Date:</strong> {cert.issuedDate}</p>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Certificate ID:</strong> {cert.certificateId}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay">
          <div className="modal-header">
            <button onClick={() => setSelectedImage(null)} className="close-btn">
              <FiX size={24} />
            </button>
            <a href={selectedImage} download className="download-btn">
              <FiDownload size={20} /> Download
            </a>
          </div>
          <div className="modal-content">
            <img src={selectedImage} alt="Full Certificate" className="zoom-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateList;
