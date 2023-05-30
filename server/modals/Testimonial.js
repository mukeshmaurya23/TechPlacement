const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TestimonialSchema = new Schema({
  name: String,
  designation: String,
  description: String,
});
const Testimonial = mongoose.model(
  "Testimonial",
  TestimonialSchema,
  "Testimonials"
);
module.exports = Testimonial;
