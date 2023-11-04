import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar'
import Split from 'react-split';
import './style.css'

function App() {
    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState('')

    const currentNote = 
        notes.find(note => note.id === currentNoteId) || notes[0];

    
    const startNotes = () => {
        const savedNotes = [
        { id: 1, body: 'Note 1' },
        { id: 2, body: 'Note 2' },
        ];
        setNotes(savedNotes);
    };

    useEffect(() => {
        startNotes();
    }, []);

    const createNewNote = () => {
        const newNote = {
            body: 'newNote',
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