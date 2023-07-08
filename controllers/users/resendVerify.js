const { User, userEmailSchema } = require("../../models/users");
const { HttpError, sendEmail } = require("../../helpers");

require("dotenv").config();
const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401);
  }

  if (user.verify) {
    throw HttpError(400, "Email is already verify");
  }

  const { error } = userEmailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a tarhet="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email please!</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = resendVerify;
