const {
  User,

  subscriptionSchema,
} = require("../../models/users");

const { HttpError } = require("../../helpers");

// Subscription
const changeSubscrition = async (req, res, next) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;
  console.log(subscription);

  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  await User.findByIdAndUpdate(id, { subscription });

  res.json({
    subscription,
  });
};
//

module.exports = changeSubscrition;
