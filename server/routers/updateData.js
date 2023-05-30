const express = require("express");
const router = express.Router();
const UserModal = require("../modals/data");

router.put("/:id", (req, res, next) => {
  const cid = req.params.id;
  const problemStatement = req.body.problemStatement;

  UserModal.findByIdAndUpdate(
    cid,

    { $push: { problemStatement: { $each: problemStatement } } },
    { new: true },
    (err, updated) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(updated);
      }
    }
  );
});

module.exports = router;
