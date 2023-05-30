const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: String,
      ref: "User",
    },

    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Comment", commentSchema);
module.exports = Model;
