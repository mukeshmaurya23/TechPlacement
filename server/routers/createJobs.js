const express = require("express");
const router = express.Router();

const Model = require("../modals/jobSchema");

const {
  postJob,
  getJobs,
  deleteJob,
  addToFav,
  removeFromFav,
} = require("../controllers/jobController");

router.post("/", postJob);
router.get("/", getJobs);
router.delete("/:id", deleteJob);
// router.put("/:id", addToFav);
// router.put("/unfav/:id", removeFromFav);

module.exports = router;
