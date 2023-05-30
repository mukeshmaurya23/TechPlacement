const express = require("express");
const router = express.Router();
const JobModal = require("../modals/jobSchema");
router.get("/", (req, res) => {
  JobModal.find()
    .then((data) => {
      //console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
});
module.exports = router;
