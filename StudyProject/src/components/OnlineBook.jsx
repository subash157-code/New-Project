import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import "./StyleFile/OnlineBook.css";

const OnlineBook = () => {
  const { id } = useParams();
  const { immediateCourses = [] } = useCart() || {};
  const navigate = useNavigate();

  const course = immediateCourses.find((c) => String(c.id) === id);

  const GST_RATE = 0.18;
  const courseFee = Number(course?.payment) || 0; // ✅ Convert to number
  const gstAmount = courseFee * GST_RATE;
  const totalAmount = courseFee + gstAmount;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    startDate: "",
    paymentType: "online",
    onlinePaymentMethod: "upi",
    upi: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    appointmentDate: "",
    timing: "morning",
    address: ""
  });

  const [errors, setErrors] = useState({});

  if (!course) {
    return (
      <div className="online-book-container">
        <p>Course not found or not added to cart.</p>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (formData.paymentType === "online" && formData.onlinePaymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.length !== 16 || !/^\d{16}$/.test(formData.cardNumber)) {
        newErrors.cardNumber = "Valid 16-digit card number is required";
      }
      if (!formData.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Valid expiry date (MM/YY) is required";
      }
      if (!formData.cardCVV || !/^\d{3}$/.test(formData.cardCVV)) {
        newErrors.cardCVV = "3-digit CVV is required";
      }
    }

    if (formData.paymentType === "offline" && !formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required for offline payment";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const bookingData = {
        ...formData,
        courseId: course.id,
        courseTitle: course.title,
        totalAmount: totalAmount.toFixed(2),
      };

      try {
        const response = await fetch("http://localhost:5000/api/paymentbooking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          alert(`Booking confirmed for ${formData.name}! Amount Paid: ₹${totalAmount.toFixed(2)}`);
          navigate("/");
        } else {
          const data = await response.json();
          alert("Error: " + (data?.error || "Booking failed."));
        }
      } catch (error) {
        alert("Server error. Please try again later.");
        console.error("Submit error:", error);
      }
    }
  };

  return (
    <div className="online-book-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="course-top-section">
        <h2>{course.title}</h2>
        <img src={course.image} alt={course.title} className="course-main-image" />
        <p><strong>Duration:</strong> {course.duration}</p>
        <p>
          <strong>Course Fee:</strong> ₹{courseFee.toFixed(2)} + ₹{gstAmount.toFixed(2)} GST = ₹{totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="bottom-layout">
        <div className="right-form">
          <h3>Booking & Payment Details</h3>
          <form className="booking-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}

            <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}

            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <label>Course Start Date:</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            {errors.startDate && <p className="error">{errors.startDate}</p>}

            <label>Payment Type:</label>
            <select name="paymentType" value={formData.paymentType} onChange={handleChange}>
              <option value="online">Online Payment</option>
              <option value="offline">Offline Payment (In Person)</option>
            </select>

            {formData.paymentType === "online" && (
              <>
                <label>Online Payment Method:</label>
                <select name="onlinePaymentMethod" value={formData.onlinePaymentMethod} onChange={handleChange}>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                </select>

                {formData.onlinePaymentMethod === "upi" && (
                  <p><strong>Our UPI ID:</strong> yourcompany@upi</p>
                )}

                {formData.onlinePaymentMethod === "card" && (
                  <>
                    <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} maxLength={16} />
                    {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

                    <input type="text" name="cardExpiry" placeholder="Expiry Date (MM/YY)" value={formData.cardExpiry} onChange={handleChange} maxLength={5} />
                    {errors.cardExpiry && <p className="error">{errors.cardExpiry}</p>}

                    <input type="password" name="cardCVV" placeholder="CVV" value={formData.cardCVV} onChange={handleChange} maxLength={3} />
                    {errors.cardCVV && <p className="error">{errors.cardCVV}</p>}
                  </>
                )}
              </>
            )}

            {formData.paymentType === "offline" && (
              <>
                <p><strong>Company Address:</strong> 123 Learning St, Education City, 456789</p>
                <label>Select Appointment Date:</label>
                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
                {errors.appointmentDate && <p className="error">{errors.appointmentDate}</p>}
              </>
            )}

            <label>Class Timing:</label>
            <select name="timing" value={formData.timing} onChange={handleChange}>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>

            <textarea name="address" placeholder="Your Full Address / Extra Notes" rows="3" value={formData.address} onChange={handleChange}></textarea>
            {errors.address && <p className="error">{errors.address}</p>}

            <button type="submit" className="submit-btn">
              Confirm & Pay ₹{totalAmount.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnlineBook;
