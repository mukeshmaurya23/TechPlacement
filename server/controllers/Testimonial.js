const Testimonial = require("../modals/Testimonial");

const postTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.create({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getTestimonial = (req, res) => {
  Testimonial.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};
const deleteTestimonial = (req, res) => {
  Testimonial.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports = { postTestimonial, getTestimonial, deleteTestimonial };
