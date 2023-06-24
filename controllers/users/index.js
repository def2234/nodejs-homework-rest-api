const signUp = require("./registerUser");
const signIn = require("./loginUser");
const getCurrent = require("./getCurrentUser");
const logout = require("./logOutUser");
const changeSubscrition = require("./changeSubscription");
const uploadAvatar = require("./uploadAvatar");

module.exports = {
  signUp,
  signIn,
  getCurrent,
  logout,
  changeSubscrition,
  uploadAvatar,
};
