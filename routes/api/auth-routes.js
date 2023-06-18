const express = require("express");

const {
  signUp,
  signIn,
  getCurrent,
  logout,
  changeSubscrition,
  uploadAvatar,
} = require("../../controllers/users");

const router = express.Router();

const { authenticate, upload } = require("../../middlewares");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/subscription", authenticate, changeSubscrition);

router.patch("/avatars", authenticate, upload.single("avatar"), uploadAvatar);

module.exports = router;
