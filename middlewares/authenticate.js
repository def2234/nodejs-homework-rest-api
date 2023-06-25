const { HttpError } = require("../helpers");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const { User } = require("../models/users");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      next(HttpError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
