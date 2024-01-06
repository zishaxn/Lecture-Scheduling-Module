const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  date: {
    type: Date, // Use Date type for better handling of dates
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor", // Reference the Instructor collection
    required: true,
  },
  location: {
    type: String,
    // Add specific validation or type constraints based on requirements
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
