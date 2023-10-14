const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  telno: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Add more fields for patient information if needed.
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
