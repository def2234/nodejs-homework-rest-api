const express = require("express");

const {
  signUp,
  signIn,
  getCurrent,
  logout,
  changeSubscrition,
  uploadAvatar,
  verify,
  resendVerify,
} = require("../../controllers/users");

const router = express.Router();

const { authenticate, upload } = require("../../middlewares");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/current", authenticate, getCurrent);

router.get("/verify/:verificationCode", verify);

router.post("/verify", resendVerify);

router.post("/logout", authenticate, logout);

router.patch("/subscription", authenticate, changeSubscrition);

router.patch("/avatars", authenticate, upload.single("avatar"), uploadAvatar);

module.exports = router;
