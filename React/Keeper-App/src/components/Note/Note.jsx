import React from "react";
import './Note.css';

function Note(note) {
    return (
        <div className="note">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
    )
}

export default Note;