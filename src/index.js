import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import './style.css'

function Sidebar(props) {
    const noteElements = props.notes.map((note, index) =>
    <div key={note.id}>
        <div className='title'>
            <h4 className='text-snippet'>{note.body.split('/n')[0]}</h4>
            <button className='delete-btn'>-</button>
        </div>
    </div>
    );

    return (
        <section className='sidebar'>
            <div className='sidebar-header'>
                <h1>Notes</h1>
                <button className='new-note'>+</button>
            </div>
            {noteElements}
        </section>
    )
}

function App() {
    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState('')

    const currentNote = 
        notes.find(note => note.id === currentNoteId) || notes[0];

    
    const fetchNotes = () => {
        const savedNotes = [
        { id: 1, body: 'Note 1' },
        { id: 2, body: 'Note 2' },
    ];
    setNotes(savedNotes);
    };

    useEffect(() => {
        fetchNotes()
    }, []);

    const createNewNote = (noteText) => {
        const newNote = {
            body: noteText,
            id: Date.now()
        };
        setNotes([...notes, newNote]);
    }

    return (
        <main>
            <Split
                sizes={[30, 70]}
                gutterSize={10}
                direction='horizontal'
                className='split'
            >
            <Sidebar 
                notes={notes}
                currentNote={currentNote}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
            />
            <div>
                <textarea className='editor'>
                    
                </textarea>
            </div>
            </Split>
        </main>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);