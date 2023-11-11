import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Split from 'react-split';
import './style.css'

function App() {
    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState('');
    const [tempNoteText, setTempNoteText] = React.useState("");

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0];

    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
    
    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem('notes')));
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

    useEffect(() => {
        if (currentNote) {

        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
        }
    }, [tempNoteText])

    const createNewNote = () => {
        const newNote = {
            body: "# Type your markdown note's title here",
            id: Date.now(),
            updatedAt: Date.now()
        };
        setNotes([...notes, newNote]);
    }

    const updateNote = (text) => {
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
            { 
            notes.length > 0
            ?
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
                <Editor 
                    tempNoteText={tempNoteText}
                    setTempNoteText={setTempNoteText}
                />
            </Split>
            :
            <div className='no-notes'>
                <h1>You have no notes</h1>
                    <button
                        className="first-note"
                        onClick={createNewNote}
                    >
                        Create one now
                </button>
            </div>

            }
        </main>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);