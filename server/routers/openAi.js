const express = require("express");
const router = express.Router();

const { getOpenAi } = require("../controllers/openAi");

router.post("/", getOpenAi);

module.exports = router;
