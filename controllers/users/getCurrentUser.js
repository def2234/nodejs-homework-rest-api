// Get current user

const getCurrent = (req, res) => {
  const { email } = req.user;
  console.log(req.user);

  res.json({
    email,
  });
};
//

module.exports = getCurrent;
