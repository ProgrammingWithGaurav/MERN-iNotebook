import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                        <i className="far fa-trash-alt mx-2"></i>
                        <i className="far fa-edit mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint facilis voluptas fugit distinctio iusto ut vitae rem delectus enim.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
