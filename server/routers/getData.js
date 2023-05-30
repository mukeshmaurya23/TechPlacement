const express = require("express");
const router = express.Router();
const UserModal = require("../modals/data");
router.get("/", (req, res, next) => {
  UserModal.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

module.exports = router;
