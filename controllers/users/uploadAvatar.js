const { User } = require("../../models/users");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const uploadAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const fileName = `${id}_${originalname}`;
  const avatarUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, avatarUpload);
  const avatarUrl = path.join("avatars", fileName);

  // Using jimp
  const image = await Jimp.read(avatarUpload);
  image.resize(250, 250);
  await image.writeAsync(avatarUpload);
  //

  console.log(tempUpload);
  await User.findByIdAndUpdate(id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = uploadAvatar;
