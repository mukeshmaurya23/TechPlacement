const express = require("express");
const router = express.Router();
// const {
//   getComment,
//   postComment,
//   updateComment,
//   deleteComment,
//   getCommentByUserId,
// } = require("../controllers/comment-section");

const { postComment, getComments } = require("../controllers/comment-feature");

//router.get("/", getComment);
router.post("/", postComment);
router.get("/", getComments);

module.exports = router;
