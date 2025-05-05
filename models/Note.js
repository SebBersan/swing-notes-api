import { v4 as uuidv4 } from 'uuid';

export function createNoteModel({ title, text, ownerId }) {
    const timestamp = new Date();
    return {
        id: uuidv4(),
        title,
        text,
        createdAt: timestamp,
        updatedAt: timestamp,
        ownerId,
    }
}