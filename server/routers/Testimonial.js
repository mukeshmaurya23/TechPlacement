const {
  deleteTestimonial,
  getTestimonial,
  postTestimonial,
} = require("../controllers/Testimonial");
const express = require("express");
const router = express.Router();

router.post("/", postTestimonial);
router.get("/", getTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
