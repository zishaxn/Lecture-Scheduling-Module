const {
  register,
  login,
  allInstructors,
  logOut,
  addCourse,
  getCourse,
  getCourseName,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);

// courses
router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);
router.get("/getcoursename/:courseId", getCourseName);
// Update this line to be consistent

module.exports = router;
