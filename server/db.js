const mongoose = require("mongoose");
require("dotenv").config();
// const connOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    //|| "mongodb://localhost:27017/companydata";
    const conn = await mongoose.connect(url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
