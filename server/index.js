require("dotenv").config();
const express = require("express");
const app = express();
//const helmet = require("helmet");
const cors = require("cors");
const connection = require("./db");
const morgan = require("morgan");
const userRoutes = require("./routers/user");
const authRoutes = require("./routers/auth");

const passwordResetRoutes = require("./routers/passwordReset");
const bodyParser = require("body-parser");
const path = require("path");

connection();

// middlewares+
app.use(express.json());

//app.use(helmet());
app.use(express.urlencoded({ extended: false }));
//cors middleware for cross origin resource sharing (CORS) - allows cross-origin requests (from different domains)
//to access the API server (the frontend) - allows us to use the API server from a different domain
app.use(cors());
//morgan is used to check the request which endpoints api called and how many times it was called
//so we can see the request in the console
app.use(morgan("dev"));

//body parser middleware
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// routes

app.use("/api/users", userRoutes);
app.use("/api/getAllusers", require("./routers/user"));
app.use("/api/setRole", require("./routers/user"));
app.use("/api/deleteUser", require("./routers/user"));
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/googlelogin", require("./routers/googleauth"));

app.use("/api/getData", require("./routers/getData"));
app.use("/api/createData", require("./routers/createData"));
app.use("/api/deleteData", require("./routers/deleteData"));
app.use("/api/updateData", require("./routers/updateData"));
app.use("/api/getJobs", require("./routers/createJobs"));
app.use("/api/createJobs", require("./routers/createJobs"));
app.use("/api/deleteJobs", require("./routers/createJobs"));
//get the fava nd unfav jobs routes from the createJobs.js
// app.use("/api/getFavJobs", require("./routers/createJobs"));
// app.use("/api/getUnFavJobs", require("./routers/createJobs"));

// app.use("/api/admin", adminRoutes, authRoutes, userRoutes);
app.use("/api/postComment", require("./routers/comment"));
app.use("/api/getComments", require("./routers/comment"));

//course

app.use("/api/analyzeResume", require("./routers/course"));

//routes for course section
app.use("/api/getCourse", require("./routers/courseSection"));
app.use("/api/createCourse", require("./routers/courseSection"));
app.use("/api/deleteCourse", require("./routers/courseSection"));
app.use("/api/updateCourse", require("./routers/courseSection"));
//app.use("/api/analyzeResume", require("./routers/courseSection"));

//routes for the testimonial
app.use("/api/postTestimonial", require("./routers/Testimonial"));
app.use("/api/getTestimonial", require("./routers/Testimonial"));
app.use("/api/deleteTestimonial", require("./routers/Testimonial"));

//routes for newsTicker
app.use("/api/postNewsTicker", require("./routers/NewsTicker"));
app.use("/api/getNewsTicker", require("./routers/NewsTicker"));
app.use("/api/deleteNewsTicker", require("./routers/NewsTicker"));

// openAI
app.use("/api/openAi", require("./routers/openAi"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.set("port", port);

app.listen(port, console.log(`Listening on port ${port}...`));

//"dev": "concurrently \"npm start\" \"npm run client\" ",
//"client": "npm start --prefix client"  --> replace in package.json
