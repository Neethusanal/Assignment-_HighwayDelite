import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"
import { data, useNavigate } from 'react-router-dom';
const Home = () => {
    const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes');
        setNotes(response.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);
 

  const handleAddNote = async () => {
    if (noteText.trim()) {
      try {
        const response = await axios.post('http://localhost:4000/createnotes', { noteText});
        setNotes([...notes, response.data]);
        setNoteText('');
      } catch (err) {
        console.error('Error adding note:', err);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };


  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  
  };

  return (
    <div className="notes-app">
 
      <div className="sidebar">
      <div className="home-container">
    {/* <h1>Welcome, {user.name}!</h1>
    <p>Your email: {user.email}</p> */}
    <button onClick={handleLogout}>Logout</button>
  </div>
        <h3>Notes</h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a new note..."
          className="note-input"
        ></textarea>
        <button onClick={handleAddNote} className="add-note-btn">
          Create Note
        </button>
      </div>
      
      <div className="notes-display">
     
    
        <h3>Your Notes</h3>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <li key={note._id} className="note-item">
                <p>{note.text}</p>
                <button onClick={() => handleDeleteNote(note._id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes created yet!</p>
        )}
      </div>
    </div>
  );
};

export default Home