import NoteContext from "./noteContext";
import { useState } from 'react'

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "617a1a0d8782b974396d6044",
      "user": "6178c09c289ef0787b758104",
      "title": "My Title1",
      "description": "My Description",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "617a1a0e8782b974396d6046",
      "user": "6178c09c289ef0787b758104",
      "title": "My Title1",
      "description": "My Description",
      "tag": "personal",
      "__v": 0
    },
    {
      "_id": "617a1a0e8782b974396d6048",
      "user": "6178c09c289ef0787b758104",
      "title": "My Title1",
      "description": "My Description",
      "tag": "personal",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = (title, description, tag) => {
    // todo: Api call
    console.log('Adding a new note');
    const note = {
      "_id": "617a1a0e8782b974396d6048",
      "user": "6178c09c289ef0787b758104",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = (id) => {
    console.log('deleting the note with id', id);
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = (id, title, description, tag) => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;