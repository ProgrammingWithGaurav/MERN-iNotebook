import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                            <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
                            <i className="far fa-edit mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet. enim.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
