const { Contact, contactAddSchema } = require("../../models/contact");

const { HttpError } = require("../../helpers");

// Update contact
const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = req.body;
    const { error } = contactAddSchema.validate(updateContact);
    if (error) {
      throw HttpError(400, error.message);
    }

    const uopdatedContacts = await Contact.findByIdAndUpdate(
      contactId,
      updateContact,
      { new: true }
    );
    if (!uopdatedContacts) {
      throw HttpError(404, `Contact whith ${contactId} not found`);
    }
    res.json(uopdatedContacts);
  } catch (error) {
    next(error);
  }
};
//

module.exports = updateContact;
