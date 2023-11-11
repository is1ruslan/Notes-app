import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar'
import Split from 'react-split';
import './style.css'

function App() {
    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState('');
    const [tempNoteText, setTempNoteText] = React.useState("");

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0];
    
    const startNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [
        { id: 1, body: 'Note 1' },
        { id: 2, body: 'Note 2' },
        ];
        setNotes(savedNotes);
    };

    useEffect(() => {
        startNotes();
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
    
    useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    const createNewNote = () => {
        const newNote = {
            body: 'newNote',
            id: Date.now()
        };
        setNotes([...notes, newNote]);
    }

    function updateNote (text) {
        const updatedNotes = notes.map(note => {
            if (note.id === currentNoteId) {
                return {...note, body: text, updatedAt: Date.now() };
            }
            return note;
        });
        setNotes(updatedNotes);
    }

    const deleteNote = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);
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
                    deleteNote={deleteNote}
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