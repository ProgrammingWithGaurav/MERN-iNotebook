import NoteContext from "./noteContext";
import { useState } from 'react'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'applicatin/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // todo: Api call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))

  }
  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'applicatin/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    const json = await response.json()
    console.log(json);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
 // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      break;
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;