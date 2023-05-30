const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  analyzeResume,
  //getBackRemovePdf,
} = require("../controllers/courses-section");

router.post("/", upload.single("resume"), analyzeResume);

module.exports = router;
