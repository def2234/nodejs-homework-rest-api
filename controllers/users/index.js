const signUp = require("./registerUser");
const signIn = require("./loginUser");
const getCurrent = require("./getCurrentUser");
const logout = require("./logOutUser");
const changeSubscrition = require("./changeSubscription");
const uploadAvatar = require("./uploadAvatar");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
  signUp,
  signIn,
  getCurrent,
  logout,
  changeSubscrition,
  uploadAvatar,
  verify,
  resendVerify,
};
