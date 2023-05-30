const mongoose = require("mongoose");

const NewsTicker = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsTicker);
module.exports = News;
