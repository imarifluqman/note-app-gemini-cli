import Note from '../schema/Note.js';

// Get all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new note
export const createNote = async (req, res) => {
    const { title, content, status } = req.body;
    const note = new Note({
        title,
        content,
        status,
        user: req.user.id
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a note
export const updateNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};