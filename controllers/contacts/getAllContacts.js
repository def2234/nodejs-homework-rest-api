const { Contact } = require("../../models/contact");

// Get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...query } = req.query;
    const skip = (page - 1) * limit;

    const allContacts = await Contact.find(
      { owner, ...query },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email subscription");

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};
//

module.exports = getAllContacts;
