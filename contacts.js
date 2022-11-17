const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getContactById(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const getId = db.find(({ id }) => id === contactId);
  return getId;
}

async function removeContact(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const index = db.findIndex((el) => {
    return el.id === contactId;
  });
  if (index === -1) {
    return null;
  }
  const removeContact = db[index];
  db.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return removeContact;
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
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
