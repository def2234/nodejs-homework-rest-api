const express = require("express");

const {
  signUp,
  signIn,
  getCurrent,
  logout,
  changeSubscrition,
} = require("../../controllers/users");

const router = express.Router();

const { authenticate } = require("../../middlewares");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/subscription", authenticate, changeSubscrition);

module.exports = router;
