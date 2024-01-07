const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  console.log("data aaya hai bhai ", req.body);
  try {
    const { username, email, password, isAdmin } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      console.log("idiot! use naother name");
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("idiot! use naother name");
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isAdmin,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.allInstructors = async (req, res, next) => {
  console.log('request');
  try {
    // useful to get all lecture data
    //After executing this query, the users variable will contain an array of user objects, each containing the specified fields (email, username, avatarImage, and _id).
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  console.log("request is here");
  console.log(req.body);
  try {
    console.log("req", req.params.id);
    if (!req.params.id) {
      return res.json({ msg: "User id is required " });
    }
    console.log('req is here');
    // localStorage.clear();
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

// -------------------------------------------------------------------
const Course = require("../models/courseModel");

module.exports.addCourse = async (req, res, next) => {
  console.log("user is here");
  try {
    // Extract course data from the request body
    const { name, level, description, image } = req.body;

    // Create a new course instance using the Course model
    const newCourse = new Course({
      name,
      level,
      description,
      image,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send a response indicating successful course creation
    return res.json({ status: true, savedCourse });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};


module.exports.getCourse = async (req, res, next) => {
  console.log('request aayi hai boss',req.body);
  try {
    // Retrieve the list of courses from the database
    const courses = await Course.find();

    // Send the list of courses as a response
    return res.json({ status: true, courses });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    next(error);
  }
};


module.exports.getCourseName = async (req, res, next) => {
  try {
    const { courseId } = req.params; // Change this line to use req.params instead of req.body

    // Rest of the code remains the same
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json({ courseName: course.name });
  } catch (error) {
    next(error);
  }
};