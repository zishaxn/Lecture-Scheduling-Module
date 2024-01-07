const {
  register,
  login,
  allInstructors,
  logOut,
  addCourse,
  getCourse,
  getCourseName,
  addSchedule,
  getSchedule,
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

// schedule
router.post("/updateschedule", addSchedule);
router.get("/getschedule",getSchedule);

module.exports = router;
