const { register, login,allInstructors,logOut,addCourse ,getCourse} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);

// courses
router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);

module.exports = router;
