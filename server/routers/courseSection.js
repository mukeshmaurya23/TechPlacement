const express = require("express");
const router = express.Router();

const {
  postCourse,
  getCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseSection");

router.post("/", postCourse);
router.get("/", getCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;
