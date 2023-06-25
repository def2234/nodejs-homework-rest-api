const { User } = require("../../models/users");
const { HttpError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user) {
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: "",
    });

    res.json({
      message: `${user.email} verify success`,
    });
  }
};

module.exports = verify;
