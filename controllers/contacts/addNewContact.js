const { Contact, contactAddSchema } = require("../../models/contact");

const { HttpError } = require("../../helpers");

// Add new contact
const addNewContact = async (req, res, next) => {
  console.log(req.user);
  try {
    const contact = req.body;
    const { _id: owner } = req.user;

    const { error } = contactAddSchema.validate(contact);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contact.create({ ...contact, owner });

    res.json(newContact);
  } catch (error) {
    next(error);
  }
};
//

module.exports = addNewContact;
