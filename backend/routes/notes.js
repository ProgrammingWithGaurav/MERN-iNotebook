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

// ROUTE 3 : updating an existing Note using : PUT "/api/auth/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send('Note Found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE 4 : deleting an existing Note using : DELETE "/api/auth/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send('Note Found') }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Found');
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note had been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router