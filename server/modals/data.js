const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  link: String,
  image: { type: String, required: true },
  //spelling should be same as you map otherwise you get error of map is not a function schema should be defined  properly
  problemStatement: [
    {
      id: String,
      q1: String,
      topic: String,
      description: String,
    },
  ],
  carrerLink: String,
  timestamp: { type: Date, default: Date.now },
});
//schema is just for look up purpose if real work done in getData.js
//const UserModal = mongoose.model("fakeJson", userSchema, "Modal");
//plural rules for collection name

//its is pluralization rules in mongo db so you have to put same name of collection as your const var name
//and then you have to use that collection name in your model if you dont follow this rule then
//its gives you an empty array or create empty collection with es in last

const Model = mongoose.model("Model", userSchema, "detailData");
module.exports = Model;
