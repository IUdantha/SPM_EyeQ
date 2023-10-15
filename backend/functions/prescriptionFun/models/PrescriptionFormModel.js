const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  fName: {
    type: String,
    required: true, //backend validation
  },
  lName: {
    type: String,
  },
  contact: {
    type: String,
  },
  birthOfDate: {
    type: Date,
  },
  doctorName: {
    type: String,
    // required: true, //backend validation
  },
  hospitalName: {
    type: String,
  },
  presDate: {
    type: Date,
  },
  expDate: {
    type: Date,
  },
  leftSpehere: {
    type: Number,
  },
  rightSpehere: {
    type: Number,
  },
  leftCylinder: {
    type: Number,
  },
  rightCylinder: {
    type: Number,
  },
  leftAxis: {
    type: Number,
  },
  rightAxis: {
    type: Number,
  },
  leftAdd: {
    type: Number,
  },
  rightAdd: {
    type: Number,
  },
  leftPrism: {
    type: String,
  },
  rightPrism: {
    type: String,
  },
  pd: {
    type: String,
  },
  bvd: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
