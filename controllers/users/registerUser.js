const { User, userRegisterSchema } = require("../../models/users");

require("dotenv").config();
const { BASE_URL } = process.env;

const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../helpers");

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

    const avatarUrl = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();
    console.log(verificationCode);

    const newUser = await User.create({
      ...dataUser,
      password: hashPassword,
      avatarUrl,
      verificationCode,
    });

    console.log(newUser);

    const verifyEmail = {
      to: email,
      subject: "Verify Email",
      html: `<a tarhet="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email please!</a>`,
    };

    await sendEmail(verifyEmail);

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
