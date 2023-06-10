const {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../models/contact");

const { HttpError } = require("../helpers");

// Get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};
//

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

// Add new contact
const addNewContact = async (req, res, next) => {
  try {
    const contact = req.body;

    const { error } = contactAddSchema.validate(contact);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contact.create(contact);

    res.json(newContact);
  } catch (error) {
    next(error);
  }
};
//

// Delete contact
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deleteContact = await Contact.findByIdAndDelete(contactId);

    if (!deleteContact) {
      throw HttpError(404, `Contact whith ${contactId} not found`);
    } else {
      res.json({
        message: "Contact deleted",
      });
    }
    res.json(deleteContact);
  } catch (error) {
    next(error);
  }
};
//

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

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
