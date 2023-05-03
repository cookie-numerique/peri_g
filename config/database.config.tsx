import Dexie from "dexie";

const database = new Dexie("peri_g");
database.version(1).stores({
  tasks: '++id, name, description, date',
});

export const tasksTable = database.table('tasks');

export default database;