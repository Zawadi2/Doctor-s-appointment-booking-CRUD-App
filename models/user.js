const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  appointmentDate: {
    type:Date,
    required: false
  },
  appointmentTime: {
    type: String,
    required: false
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  appointments: [appointmentSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
