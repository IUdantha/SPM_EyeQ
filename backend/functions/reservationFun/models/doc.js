
const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  
  myFile: String
});

const Doc = mongoose.model("DocList", docSchema);

module.exports = Doc;
