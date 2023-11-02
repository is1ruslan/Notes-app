import React from 'react';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import './style.css'

function Sidebar(props) {
    // const noteElements = props.notes.map((note, index) =>
    // <div key={note.id}>
    //     <div className='title'>
    //         <h4 className='text-snippet'>{note.body.split('/n')[0]}</h4>
    //         <button className='delete-btn'>-</button>
    //     </div>
    // </div>
    // )

    return (
        <section className='sidebar'>
            <div className='sidebar-header'>
                <h1>Notes</h1>
                <button className='new-note'>+</button>
            </div>
            'noteElements'
        </section>
    )
}

function App() {
    const [notes, setNotes] = React.useState([]);
    const [currentNoteId, setCurrentNoteId] = React.useState('')

    const currentNote = 
        notes.find(note => note.id === currentNoteId) || notes[0];

    return (
        <main>
            <Split
                sizes={[30, 70]}
                gutterSize={10}
                direction='horizontal'
                className='split'
            >
            <Sidebar />
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