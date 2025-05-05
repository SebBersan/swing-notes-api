import { notesDB } from '../db/nedb.js';
import { createNoteModel } from '../models/Note.js';

// Hämta alla anteckningar för den inloggade användaren
export function getNotes(req, res) {
    notesDB.find({ ownerId: req.user.id}, (err, notes) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(notes);
    });
}

// Skapar en ny anteckning.
export function createNote(req, res) {
    const note = createNoteModel({
        title: req.body.title,
        text: req.body.text,
        ownerId: req.user.id,
    });
    
    notesDB.insert(note, (err, newNote) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json(newNote);
    });
}

// editerar en anteckning.
export function updateNote(req, res) {
    const { id } = req.params;
    const { title, text } = req.body;
    notesDB.update({ id, ownerId: req.user.id }, { $set: { title, text, updatedAt: new Date() } }, {}, (err, numAffected) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (numAffected === 0) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note updated' });
    });
}

// Raderar en anteckning.
export function deleteNote(req, res) {
    const { id } = req.params;
    notesDB.remove({ id, ownerId: req.user.id }, {}, (err, numRemoved) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (numRemoved === 0) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted' });
    });
}

// söker efter anteckningar baserat på en sökfråga.
export function searchNotes(req, res) {
    const query = req.query.q;

    if (!query) return res.status(400).json({ message: 'Query parameter is required' }); // kollar om query finns

    const regexQuery = new RegExp(query, 'i'); // skapar en RegExp för att söka i titeln och texten

    // Sök i databasen efter anteckningar som matchar titeln eller texten.
    notesDB.find({ 
        ownerId: req.user.id, 
        $or: [
            { title: { $regex: regexQuery } }, 
            { text: { $regex: regexQuery} }
        ] 
    }, (err, notes) => {
        if (err) {
            console.error('Error while querying the database:', err);  
            return res.status(500).json({ message: 'Database error' });
        }
        console.log('Query result:', notes); 
        if (notes.length === 0) return res.status(404).json({ message: 'No notes found' });
        res.json(notes);
    });
}


