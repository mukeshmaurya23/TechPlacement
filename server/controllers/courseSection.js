const Model = require("../modals/courses");

const cloudinary = require("../utils/cloudinary");

const multer = require("multer");
const pdfparse = require("pdf-parse");
const fs = require("fs");

const analyzeResume = async (req, res) => {
  const file = req.file;
  const pdffile = fs.readFileSync(file.path);
  pdfparse(pdffile)
    .then(async function (data) {
      const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node",
        "Express",
        "MongoDB",
        "Python",
        "Django",
        "java",
        "C++",
        "C",
        "C#",
        "PHP",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "Ruby",
        "Ruby on Rails",
        "Swift",
        "Kotlin",
        "Go",
        "R",
        "Git",
        "GitHub",
        "Linux",
        "AWS",
        "Azure",
        "GCP",
        "Docker",
        "Kubernetes",
        "Data Science",
        "Machine Learning",
        "Python",
      ].map((skill) => skill.toLowerCase());

      const courses = await Model.find();
      const suggestedCourses = skills
        .map((skill) => {
          const matchedCourses = courses.filter((course) =>
            course.skills.map((s) => s.toLowerCase()).includes(skill)
          );
          if (matchedCourses.length > 0) {
            return {
              skill: skill,
              courses: matchedCourses,
            };
          } else {
            return null;
          }
        })
        .filter((s) => s !== null);

      res.status(200).json({
        status: "success",
        suggestedCourses: suggestedCourses,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

// console.log(course);

const postCourse = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
  });
  const upload = multer({ storage }).single("image");

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Courses",
      });
      console.log(result);

      const { title, views, description, by, lessons } = req.body;

      const data = await Model.create({
        title,
        views,
        description,
        by,
        lessons: JSON.parse(lessons),
        image: result.secure_url,
      });

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
  });
};

const getCourse = async (req, res, next) => {
  try {
    const data = await Model.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;

    Model.findById(id)
      .then((course) => {
        return course.remove();
      })
      .then(() => {
        res.status(200).json({ message: "Deleted course." });
      })
      .catch((err) => {
        const error = new Error("Something went wrong, could not delete.", 500);
        return next(error);
      });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updateCourse = async (req, res, next) => {
  const cid = req.params.id;
  const { lessons } = req.body;
  try {
    Model.findByIdAndUpdate(
      cid,
      { $push: { lessons: { $each: lessons } } },
      { new: true },
      (err, updated) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(updated);
        }
      }
    );
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  postCourse,
  getCourse,
  deleteCourse,
  updateCourse,
  analyzeResume,
};
