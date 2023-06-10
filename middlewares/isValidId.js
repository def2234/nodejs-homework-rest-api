const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);

  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} invalid id format`));
  }
  next();
};

module.exports = isValidId;
