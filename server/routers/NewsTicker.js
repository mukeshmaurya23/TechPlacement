const express = require("express");
const router = express.Router();

const { postNews, getNews, deleteNews } = require("../controllers/NewsTicker");

router.post("/", postNews);
router.get("/", getNews);
router.delete("/:id", deleteNews);

module.exports = router;
