const doctorsSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
      },
      Name: {
        type: String,
        required: [true, " full name is required"],
      },
      specialization: {
        type: String,
        required: [true, "specialization is require"],
      },
      availibility: {
        type: Object,
        required: [true, "wrok timing is required"],
      },
    }
  );
const User = mongoose.model("Doctor", doctorsSchema);

module.exports = Doctor;