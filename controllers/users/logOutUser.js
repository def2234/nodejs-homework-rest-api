const { User } = require("../../models/users");

// Log out
const logout = async (req, res) => {
  const { _id: id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204);
};
//

module.exports = logout;
