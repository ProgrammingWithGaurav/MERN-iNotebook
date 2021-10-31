import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                            <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>
                            <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <div className="my-2 d-flex justify-content-between">
                        <p className="card-text w-75">{note.description}</p>
                        <span className="badge bg-danger col-auto h-25">{note.tag}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
