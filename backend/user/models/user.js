const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true, minlength: 6},
  image: {type: String, require: true},
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
