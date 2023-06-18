const {
  Contact,

  contactUpdateFavoriteSchema,
} = require("../../models/contact");

const { HttpError } = require("../../helpers");

// Update favorite in contact
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = req.body;
    const { error } = contactUpdateFavoriteSchema.validate(updateContact);
    if (error) {
      throw HttpError(400, error.message);
    }

    const uopdatedContacts = await Contact.findByIdAndUpdate(
      contactId,
      updateContact,
      { new: true }
    );
    if (!uopdatedContacts) {
      throw HttpError(400, `Missing field favorite`);
    }
    res.json(uopdatedContacts);
  } catch (error) {
    next(error);
  }
};
//

module.exports = updateStatusContact;
