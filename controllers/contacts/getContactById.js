const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

// Get contact by id
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const getContactById = await Contact.findOne({ _id: contactId });

    if (!getContactById) {
      throw HttpError(404, `Contact whith ${contactId} not found`);
    }
    res.json(getContactById);
  } catch (error) {
    next(error);
  }
};
//

module.exports = getContactById;
