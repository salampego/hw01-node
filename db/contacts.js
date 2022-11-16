const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getContactById(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const getId = db.filter(({ id }) => id === contactId);
  return getId;
}

async function removeContact(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const removeFilter = db.filter(({ id }) => id !== contactId);
  return removeFilter;
}

async function addContact(name, email, phone) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  db.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return db;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
