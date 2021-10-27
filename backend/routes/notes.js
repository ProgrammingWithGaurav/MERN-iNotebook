const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get All the notes using : GET "/api/auth/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE 2 : Add a new Note POST : GET "/api/auth/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 5 character').isLength({ min: 5 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad request and the rrors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router