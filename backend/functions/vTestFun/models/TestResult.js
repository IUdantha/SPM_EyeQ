const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TestResult = new Schema({
  userId: {type: String, required: true},
  date: {type: String, required: true},
  result: {type: Number, required: true},
  note: {type: String},
});

module.exports = mongoose.model("TestResult", TestResult);
