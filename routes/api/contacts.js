const express = require("express");

const {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts-controllers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

// Get all Contact!
router.get("/", getAllContacts);
//

// Get contact by id!
router.get("/:contactId", isValidId, getContactById);
//

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

// Add new contact!
router.post("/", addNewContact);
//

// Delete contact!
router.delete("/:contactId", isValidId, deleteContact);
//

// Update contact!
router.put("/:contactId", isValidId, updateContact);

module.exports = router;
