import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userDB } from '../db/nedb.js';
import { createUserModel } from '../models/User.js';

// skapa en ny användare
export async function signup(req, res) {
    const { username, password } = req.body;

    userDB.findOne({ username }, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10); // hashar lösenordet där 10 är antalet salt-rundor

        const newUser = createUserModel({ username, hashedPassword });

        userDB.insert(newUser, (err, insertedUser) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(201).json({ message: 'User created', user: { id: insertedUser._id, username: insertedUser.username } });
        });
    });
}

// logga in en användare
export async function login(req, res) {
    const { username, password } = req.body;

    userDB.findOne({ username }, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
}