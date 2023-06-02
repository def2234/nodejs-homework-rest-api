const fs = require("fs").promises;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.format({
  root: "./",
  dir: "models",
  base: "contacts.json",
});

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsResult = JSON.parse(contacts);

    return contactsResult;
  } catch (error) {
    return console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactsId = contacts.find(({ id }) => id === contactId);

    return contactsId || null;
  } catch (error) {
    return console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const removeContact = contacts.find((contact) => contact.id === contactId);
    contacts.pop(removeContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return removeContact;
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact(body) {
  try {
    let contacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    contacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts;
  } catch (error) {
    return console.log(error.message);
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await listContacts();
    const findIndexContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (findIndexContact === -1) {
      return null;
    }
    contacts[findIndexContact] = { ...contacts[findIndexContact], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[findIndexContact];
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
