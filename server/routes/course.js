const { addCourse } = require('../controllers/courseController')

const router = require("express").Router();

router.post("/addcourse", addCourse);

module.exports = router;