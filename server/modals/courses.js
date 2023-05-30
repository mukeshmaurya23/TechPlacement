const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },

    by: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },

    lessons: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        video: {
          type: String,
        },
        timeStamp: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a model for courses
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
