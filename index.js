const { Command } = require("commander");
const program = new Command();
const db = require("./db/contacts");

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
      console.table([...contacts]);
      break;

    case "get":
      const getID = await db.getContactById(id);
      console.table([...getID]);
      break;

    case "add":
      const add = await db.addContact(name, email, phone);
      console.table([...add]);
      break;

    case "remove":
      const remove = await db.removeContact(id);
      console.table([...remove]);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);