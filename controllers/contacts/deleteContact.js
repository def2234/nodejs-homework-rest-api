const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

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

module.exports = deleteContact;
