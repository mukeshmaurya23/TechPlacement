const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Model = require("../modals/data");
const fileUpload = require("../middleware/file-upload");
//C:/Users/Admin/Desktop/MERN_Project/client/public/asset
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "C:/Users/Admin/Desktop/MERN_Project/client/public/asset");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// //upload.single("testImage")
// const upload = multer({ storage: storage, fileFilter: fileFilter });
// router.post("/", upload.single("image"), (req, res, next) => {
//   // const img = fs.readFileSync(req.file.path);
//   // const encode_img = img.toString("base64");
//   //const url = req.protocol + "://" + req.get("host");
//   const data = new Model({
//     _id: new mongoose.Types.ObjectId(),
//     id: req.body.id,
//     title: req.body.title,
//     description: req.body.description,
//     link: req.body.link,
//     image: "/asset/" + req.file.filename,
//   });
//   data
//     .save()
//     .then((result) => {
//       // res.send("Data saved");
//       // console.log("data saved");
//       res.status(201).json({
//         message: "Data saved",
//         createdData: {
//           _id: result._id,
//           id: result.id,
//           title: result.title,
//           description: result.description,
//           link: result.link,
//           image: result.image,
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// try {
//   const data = await Model.create({
//     id: req.body.id,
//     title: req.body.title,
//     description: req.body.description,

//     link: req.body.link,
//     problemStatement: req.body.problemStatement,
//   });
//   res.send(data);
//   console.log(data);
// } catch (error) {
//   res.status(500).send({ message: "Internal Server Error" });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./client/public/asset/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const data = await UserModal.create({
//       id: req.body.id,
//       title: req.body.title,
//       description: req.body.description,
//       link: req.body.link,
//       image: req.file.image,
//     });
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const data = await UserModal.create({
//       id: req.body.id,
//       title: req.body.title,
//       description: req.body.description,
//       link: req.body.link,
//     });
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

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
      subject: `New post: ${post.title}`,
      text: `Hi ${user.firstName},\n\nA new post has been created: ${post.title}\n\n${post.description}\n\n Visit Our Website for Further Details\n\nBest regards,\nTechPlacement Team`,
    };
    // Send the email
    await emailTransport.sendMail(mailOptions);
  }
}

router.post("/", fileUpload.single("image"), async (req, res) => {
  const { id, title, description, link, carrerLink } = req.body;
  const createdData = new Model({
    id,
    title,
    description,
    link,
    carrerLink,
    //parse the problemStatement from the request body

    problemStatement: JSON.parse(req.body.problemStatement),
    //this line https://stackoverflow.com/questions/68940766/react-sending-array-of-objects-as-form-data
    image: req.file.path,
  });
  try {
    await createdData.save();
    res.status(201).json({
      message: "Data saved",
      createdData: {
        _id: createdData._id,
        id: createdData.id,
        title: createdData.title,
        description: createdData.description,
        link: createdData.link,
        carrerLink: createdData.carrerLink,
        problemStatement: createdData.problemStatement,
        image: createdData.image,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
  await sendNewPostEmail(createdData);
  res.send("Data saved");
});
module.exports = router;
