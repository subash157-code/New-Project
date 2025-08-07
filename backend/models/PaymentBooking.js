const mongoose = require('mongoose');

const PaymentBookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  startDate: Date,
  paymentType: String,
  onlinePaymentMethod: String,
  upi: String,
  cardNumber: String,
  cardExpiry: String,
  cardCVV: String,
  appointmentDate: Date,
  timing: String,
  address: String,
  courseId: String,
  courseTitle: String,
  totalAmount: String,
}, { timestamps: true });

module.exports = mongoose.model('PaymentBooking', PaymentBookingSchema);
