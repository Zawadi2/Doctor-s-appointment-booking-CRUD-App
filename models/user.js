const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Email: {
    type: String, 
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  appointmentDate: {
    type:Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
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
