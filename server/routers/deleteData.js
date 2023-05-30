const express = require("express");
const router = express.Router();
const HttpError = require("../modals/HttpError");
const UserModal = require("../modals/data");
const fs = require("fs");
router.delete("/:id", async (req, res, next) => {
  const cId = req.params.id;
  console.log(cId);

  //select the image from the database and delete it from the folder of uploads
  const company = await UserModal.findById(cId);
  const imagePath = company.image;
  console.log(imagePath);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("image deleted");
    }
  });
  //delete the data from the database
  UserModal.findById(cId)
    .then((company) => {
      return company.remove();
    })
    .then(() => {
      res.status(200).json({ message: "Deleted company." });
    })
    .catch((err) => {
      const error = new HttpError(
        "Something went wrong, could not delete.",
        500
      );
      return next(error);
    });
});
module.exports = router;
