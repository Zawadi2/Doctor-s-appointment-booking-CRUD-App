// const { link } = require("../controllers/appointments");
const mongoose = require("mongoose");

const doctorsSchema = new mongoose.Schema(
    {
      id: {
        type: Number,
      },
      name: {
        type: String,
        required: true,
      },
      specialty: {
        type: String,
        required: true,
      },
      availability: {
        type: [String],
        required: true,
      },
      photo: {
        type: String,
        required: true
      }
    }
  );
const Doctor = mongoose.model("Doctor", doctorsSchema);

module.exports = Doctor;