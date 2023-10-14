const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // Add more fields for doctor information if needed (e.g., specialty, contact information).
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
