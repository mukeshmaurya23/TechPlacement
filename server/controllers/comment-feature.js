const Model = require("../modals/Comments");

const postComment = (req, res, next) => {
  const comment = new Model(req.body);
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Model.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
};
const getComments = (req, res, next) => {
  Model.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports = {
  postComment,
  getComments,
};
