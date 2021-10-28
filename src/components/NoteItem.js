import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div class ="card-body">
                <h5 class ="card-title">{note.title}</h5>
                <p class ="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint facilis voluptas fugit distinctio iusto ut vitae rem delectus enim.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
