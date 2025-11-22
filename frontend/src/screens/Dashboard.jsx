import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaSignOutAlt, FaBars, FaChevronDown, FaTrash, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', status: 'pending' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  // Function to generate random colors for cards
  const getRandomColor = () => {
    const funkyColors = [
      '#fec870',
      '#fd9a71',
      '#b591fb',
      '#00d3fe',
    ];
    return funkyColors[Math.floor(Math.random() * funkyColors.length)];
  };
  
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
          headers: { 'x-auth-token': token },
        });
        setNotes(response.data.map(note => ({ ...note, color: getRandomColor() })));
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleAddNote = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token found. Please log in.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, newNote, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${token}`,
        },
      });

      const addedNote = { ...response.data, color: getRandomColor() };
      setNotes([...notes, addedNote]);
      setShowAddEditModal(false);
      setNewNote({ title: '', content: '', status: 'pending' });
      toast.success('Note added successfully!');
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note.');
    }
  };

  const handleEditNote = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${currentNote._id}`, currentNote, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      setNotes(notes.map(note => (note._id === currentNote._id ? { ...response.data, color: currentNote.color } : note)));
      setShowAddEditModal(false);
      setCurrentNote(null);
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note.');
    }
  };

  const handleDeleteNote = async (id) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setNotes(notes.filter(note => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note.');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      setNotes(notes.map(note => (note._id === id ? { ...response.data, color: notes.find(n => n._id === id).color } : note)));
      toast.success('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status.');
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentNote(null);
    setNewNote({ title: '', content: '', status: 'pending' });
    setShowAddEditModal(true);
  };

  const openEditModal = (note) => {
    setIsEditMode(true);
    setCurrentNote(note);
    setNewNote(note); // Pre-fill the form with current note data
    setShowAddEditModal(true);
  };

  const closeModal = () => {
    setShowAddEditModal(false);
    setIsEditMode(false);
    setCurrentNote(null);
    setNewNote({ title: '', content: '', status: 'pending' });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 bg-gray-100 p-4 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'w-20' : '-translate-x-full'}`}>
        <div className="flex flex-col justify-between h-full items-center">
          <button onClick={openAddModal} className="bg-black rounded-full p-4 focus:outline-none cursor-pointer transform hover:scale-110 transition-transform duration-300">
            <FaPlus className="text-white text-2xl" />
          </button>
          <button onClick={handleLogout} className="focus:outline-none transform hover:scale-110 transition-transform duration-300">
            <FaSignOutAlt className="text-red-500 text-3xl" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="focus:outline-none md:hidden">
              <FaBars className="text-2xl" />
            </button>
            {/* <div className="flex items-center ml-4">
              <FaUserCircle className="text-2xl text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-700 ml-2">Welcome, {userName}!</h2>
            </div> */}
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Notes</h1>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {notes.map(note => (
              <div key={note._id} 
                   className={`break-inside-avoid rounded-lg shadow-md p-4 flex flex-col justify-between text-black mb-4`} 
                   style={{ backgroundColor: note.color }}>
                <div>
                  <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                  <p className="text-gray-800 break-words">{note.content}</p>
                  <p className="text-sm mt-2">Status: {note.status}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="relative inline-block">
                    <select
                      value={note.status}
                      onChange={(e) => handleUpdateStatus(note._id, e.target.value)}
                      className="block w-32 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm appearance-none cursor-pointer hover:border-gray-400 transition duration-150 ease-in-out"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(note)}
                      className="text-black cursor-pointer hover:text-gray-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className="text-black cursor-pointer hover:text-red-500 focus:outline-none transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[90%] max-w-sm sm:max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-bold mb-4">{isEditMode ? 'Edit Note' : 'Add New Note'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={isEditMode ? currentNote.title : newNote.title}
              onChange={e => isEditMode ? setCurrentNote({ ...currentNote, title: e.target.value }) : setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-3 mb-4 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300"
            />
            <div className="relative w-full mb-4"> 
              <select
                value={isEditMode ? currentNote.status : newNote.status}
                onChange={e => isEditMode ? setCurrentNote({ ...currentNote, status: e.target.value }) : setNewNote({ ...newNote, status: e.target.value })}
                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 appearance-none"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>
            <textarea
              placeholder="Description"
              value={isEditMode ? currentNote.content : newNote.content}
              onChange={e => isEditMode ? setCurrentNote({ ...currentNote, content: e.target.value }) : setNewNote({ ...newNote, content: e.target.value })}
              className="w-full p-3 mb-4 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={isEditMode ? handleEditNote : handleAddNote}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {isEditMode ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;