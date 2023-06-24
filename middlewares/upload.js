const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerStorage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = upload;
