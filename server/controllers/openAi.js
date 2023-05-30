const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const getOpenAi = async (req, res, next) => {
  const openai = new OpenAIApi(configuration);
  const { query } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 2048,
    temperature: 0,
  });
  res.json({ botResponse: response.data.choices[0].text });
};

module.exports = {
  getOpenAi,
};
