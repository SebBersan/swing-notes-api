import Datastore from 'nedb';

const notesDB = new Datastore({ filename: '.db/notes.db', autoload: true });
const userDB = new Datastore({ filename: '.db/user.db', autoload: true });

export { notesDB, userDB };