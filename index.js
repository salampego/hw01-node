const { Command } = require("commander");
const program = new Command();
const db = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await db.listContacts();
      console.table(contacts);
      break;

    case "get":
      const getID = await db.getContactById(id);
      console.table(getID);
      break;

    case "add":
      const newContact = await db.addContact(name, email, phone);
      console.table(newContact);
      console.log(`Contact ${name} successfully added`);
      break;

    case "remove":
      const deleteContact = await db.removeContact(id);
      console.table(deleteContact);
      console.log(`Contact with id - ${id} just removed`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
