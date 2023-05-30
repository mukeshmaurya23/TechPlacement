const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  role: String,
  experience: String,
  level: String,
  location: String,
  jobStat: String,

  companyName: String,

  //count days from the date of posting
  //date: String,
  //count no of applicants
  //applicants: Number,
  salary: String,
  //count no of views
  // views: Number,
  // //count no of shares
  // shares: Number,
  overview: String,
  timestamp: { type: Date, default: Date.now },

  jobDesc: [
    {
      description: String,
    },
  ],
  applyUrl: String,

  // jobDesc: String,
  logo: {
    type: String,
    required: true,
  },

  // logo: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
});
const JobModal = mongoose.model("JobModal", jobSchema, "Jobs");
module.exports = JobModal;
