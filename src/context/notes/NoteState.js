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
    return (
        <NoteContext.Provider value={{notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;