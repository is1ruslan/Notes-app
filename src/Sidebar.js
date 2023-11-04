import React from 'react';

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) =>
    <div key={note.id}>
        <div className='title'>
            <h4 className='text-snippet'>{note.body.split('/n')[0]}</h4>
            <button className='delete-btn'>
                <i className="gg-trash"></i>
            </button>
        </div>
    </div>
    );

    return (
        <section className='sidebar'>
            <div className='sidebar-header'>
                <h1>Notes</h1>
                <button className='new-note' onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
