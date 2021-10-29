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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OGMwOWMyODllZjA3ODdiNzU4MTA0In0sImlhdCI6MTYzNTMwMzU4MH0.xeoAKfdLrHxh_Ehy-Nnbg6yhilSSg1yX581s6Os6jM4'
      }
    })
    const json = await response.json();
    // console.log(json);
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OGMwOWMyODllZjA3ODdiNzU4MTA0In0sImlhdCI6MTYzNTMwMzU4MH0.xeoAKfdLrHxh_Ehy-Nnbg6yhilSSg1yX581s6Os6jM4"
      },
      body: JSON.stringify({ title, description, tag })
    });

    // console.log('Adding a new note');
    const note = {
      "_id": "617a1a0e8782b974396d6048",
      "user": "6178c09c289ef0787b758104",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    }
    setNotes(notes.concat(note))
    const json = await response.json()
    console.log(json)

  }
  // Delete a Note
  const deleteNote = async (id) => {
    console.log('deleting the note with id', id);
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'applicatin/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OGMwOWMyODllZjA3ODdiNzU4MTA0In0sImlhdCI6MTYzNTMwMzU4MH0.xeoAKfdLrHxh_Ehy-Nnbg6yhilSSg1yX581s6Os6jM4'
      }
    })
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    const json = await response.json()
    console.log(json)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
 // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OGMwOWMyODllZjA3ODdiNzU4MTA0In0sImlhdCI6MTYzNTMwMzU4MH0.xeoAKfdLrHxh_Ehy-Nnbg6yhilSSg1yX581s6Os6jM4"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json)

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