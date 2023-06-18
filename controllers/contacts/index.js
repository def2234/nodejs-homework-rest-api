const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateStatusContact = require("./updateFavoriteInContact");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");

module.exports = {
  getAllContacts,
  getContactById,
  updateStatusContact,
  addNewContact,
  deleteContact,
  updateContact,
};
