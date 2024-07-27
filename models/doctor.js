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
      },
      patientid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
    }
  );
const Doctor = mongoose.model("Doctor", doctorsSchema);

module.exports = Doctor;