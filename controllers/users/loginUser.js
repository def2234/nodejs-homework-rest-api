const {
  User,

  userLoginSchema,
} = require("../../models/users");

require("dotenv").config();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

// Login User
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const dataUser = req.body;
    const loginUser = await User.findOne({ email });

    if (!loginUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { error } = userLoginSchema.validate(dataUser);
    if (error) {
      throw HttpError(400, error.message);
    }

    const passwordCompare = await bcrypt.compare(password, loginUser.password);
    if (!passwordCompare) {
      throw HttpError(401, "Password is wrong");
    }

    const { _id: id } = loginUser;

    const payload = {
      id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
      token,
      user: {
        email: loginUser.email,
        subscription: loginUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
//

module.exports = signIn;
