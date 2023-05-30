const { User } = require("../modals/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const setRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { role },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllUsers,
  setRole,
  deleteUser,
};
