const Model = require("../modals/jobSchema");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");
// const postJob = async (req, res, next) => {
//   try {
//     const {
//       title,
//       subTitle,
//       role,
//       experience,
//       level,
//       location,
//       jobStat,
//       jobDays,
//       companyName,
//       fav,
//       date,
//       applicants,
//       salary,

//       overview,
//       jobDesc,
//     } = req.body;
//     console.log(salary);
//     const logo = req.file.path;
//     console.log("logo", logo);
//     const result = await cloudinary.uploader.upload(logo, {
//       upload_preset: "Jobs",
//     });
//     console.log("result", result);
//     const data = await Model.create({
//       title,
//       subTitle,
//       role,
//       experience,
//       level,

//       location,
//       jobStat,
//       jobDays,
//       companyName,
//       fav,
//       date,
//       applicants,
//       salary,

//       overview,
//       jobDesc,
//       logo: result.secure_url,
//     });
//     res.status(200).json({ message: "Job created successfully", data });
//   } catch (err) {
//     res.status(500).send({ error: err });
//   }
// };
// const addToFav = async (req, res, next) => {
//   //find the fav and make it true
//   try {
//     //find the fav from model and make it true
//     const jId = req.params.id;
//     console.log(jId);
//     Model.findById(jId).then((job) => {
//       if (!job) {
//         return res.status(404).json({ message: "Job not found" });
//       }
//       job.fav = true;
//       job.save();
//       res.status(200).json({ message: "Job added to fav" });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };
// const removeFromFav = async (req, res, next) => {
//   //find the fav and make it false
//   try {
//     //find the fav from model and make it false
//     const jId = req.params.id;
//     console.log(jId);
//     Model.findById(jId).then((job) => {
//       if (!job) {
//         return res.status(404).json({ message: "Job not found" });
//       }
//       job.fav = false;
//       job.save();
//       res.status(200).json({ message: "Job removed from fav" });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };
// const postJob = async (req, res, next) => {

//   const logo = req.files.logo;
//   cloudinary.uploader.upload(logo.tempFilePath, (err, result) => {
//     console.log(result);
//     const data = Model.create({
//       title: req.body.title,
//       subTitle: req.body.subTitle,
//       role: req.body.role,
//       experience: req.body.experience,
//       level: req.body.level,

//       location: req.body.location,
//       jobStat: req.body.jobStat,
//       jobDays: req.body.jobDays,
//       companyName: req.body.companyName,

//       date: req.body.date,
//       applicants: req.body.applicants,
//       salary: req.body.salary,

//       overview: req.body.overview,
//       jobDesc: req.body.jobDesc,
//       logo: result.secure_url,
//     });
//     data
//       .save()
//       .then((data) => {
//         res.status(200).json({ message: "Job created successfully", data });
//       })
//       .catch((err) => {
//         res.status(500).send({ error: err });
//       });
//   });

//   //   const data = await Model.create({
//   //     title,
//   //     subTitle,
//   //     role,
//   //     experience,
//   //     level,

//   //     location,
//   //     jobStat,
//   //     jobDays,
//   //     companyName,
//   //     fav,
//   //     date,
//   //     applicants,
//   //     salary,

//   //     overview,
//   //     jobDesc,
//   //     logo: logoUrl,
//   //   });

//   //   res.status(200).json({ message: "Job created successfully", data });
//   // } catch (err) {
//   //   res.status(500).send({ error: err });
//   // }
// };
const { User } = require("../modals/user");

const emailTransport = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
async function sendNewPostEmail(post) {
  // Get a list of all registered users
  const users = await User.find({});
  // Send an email to each user
  for (const user of users) {
    // Construct the email
    const mailOptions = {
      from: '"TechPlacement" <noreply@tech-placement.com>',
      to: user.email,
      subject: `New Job Post: ${post.title}`,
      text: `Hi ${user.firstName},\n\nA new Job has been created: ${post.title}\n\n${post.overview}\n\n Visit Our Website for Further Details\n\nBest regards,\nTechPlacement Team`,
    };
    // Send the email
    await emailTransport.sendMail(mailOptions);
  }
}

const postJob = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
  });
  const upload = multer({ storage }).single("logo");

  // upload to cloudinary
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Jobs",
      });
      console.log(result);

      const {
        title,
        subTitle,
        role,
        experience,
        level,
        location,
        jobStat,

        companyName,
        applyUrl,
        salary,
        overview,
        jobDesc,
      } = req.body;

      const data = await Model.create({
        title,
        subTitle,
        role,
        experience,
        level,
        location,
        jobStat,

        companyName,
        applyUrl,

        salary,
        overview,
        jobDesc: JSON.parse(jobDesc),
        logo: result.secure_url,
      });

      //unlink the file from the multer

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });

      res.status(200).json({ message: "Job created successfully", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
    await sendNewPostEmail(req.body);
  });
};

const getJobs = (req, res, next) => {
  //get cloudinary images

  Model.find()
    .then((data) => {
      //console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};

const deleteJob = async (req, res, next) => {
  try {
    const jId = req.params.id;
    console.log(jId);

    Model.findById(jId).then((job) => {
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      Model.findByIdAndRemove(jId)
        .then(() => {
          res.status(200).json({ message: "Job deleted" });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  postJob,
  getJobs,
  deleteJob,
  // addToFav,
  // removeFromFav,
};
