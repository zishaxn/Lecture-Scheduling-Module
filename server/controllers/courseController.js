const Course = require("../models/courseModel");

module.exports.addCourse = async (req, res, next) => {
  try {
    // Extract course data from the request body
    const { name, level, description, image} = req.body;

    // Create a new course instance using the Course model
    const newCourse = new Course({
      name,
      level,
      description,
      image,
      instructor,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send a response indicating successful course creation
    res.status(201).json(savedCourse);
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};
