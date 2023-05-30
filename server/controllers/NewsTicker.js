const Model = require("../modals/NewsTicker");

const postNews = async (req, res, next) => {
  const { title, link } = req.body;

  const data = await Model.create({
    title,
    link,
  });

  res.status(200).json({
    status: "success",
    data,
  });
};

const getNews = async (req, res, next) => {
  try {
    const data = await Model.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteNews = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Model.findByIdAndDelete(id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  postNews,
  getNews,
  deleteNews,
};
