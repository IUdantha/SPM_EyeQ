const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  doctor: String,
  patientName: String,
  contactNumber: String,
  age: Number,
  address: String,
  email: String,
  paymentMethod: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
