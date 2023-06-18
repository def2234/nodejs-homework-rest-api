const { User, userRegisterSchema } = require("../../models/users");

require("dotenv").config();

const bcrypt = require("bcryptjs");

const { HttpError } = require("../../helpers");

// Register user
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const dataUser = req.body;

    if (user) {
      throw HttpError(409, "The email is already in use.");
    }

    const { error } = userRegisterSchema.validate(dataUser);
    if (error) {
      throw HttpError(400, error.message);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...dataUser, password: hashPassword });

    res.status(201).json({
      name: dataUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};
//

module.exports = signUp;
