const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

// Joi params!
const Joi = require("joi");
const phone = /^\+\d{1,3}\d{9}$/;

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(phone).required(),
});
//

// Get all Contact!
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});
//

// Get contact by id!
router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const getContactById = await contacts.getContactById(id);

    if (!getContactById) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(getContactById);
  } catch (error) {
    next(error);
  }
});
//

// Add new contact!
router.post("/", async (req, res, next) => {
  try {
    const contact = req.body;

    console.log(contact);
    const { error } = contactAddSchema.validate(contact);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const newContact = await contacts.addContact(contact);

    res.json(newContact);
  } catch (error) {
    next(error);
  }
});
//

// Delete contact!
router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const deleteContact = await contacts.removeContact(id);

    if (!deleteContact) {
      return res.status(404).json({
        message: "Not found",
      });
    } else {
      res.json({
        message: "Contact deleted",
      });
    }
    res.json(deleteContact);
  } catch (error) {
    next(error);
  }
});
//

// Update contact!
router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updateContact = req.body;
    const { error } = contactAddSchema.validate(updateContact);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const uopdatedContacts = await contacts.updateContact(id, updateContact);
    if (!uopdatedContacts) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.json(uopdatedContacts);
  } catch (error) {
    next(error);
  }
});
//

module.exports = router;
