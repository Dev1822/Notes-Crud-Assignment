const Note = require("../models/note.model");
const mongoose = require("mongoose");

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const newNote = new Note(req.body);
        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: newNote
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.createBulk = async (req, res) => {
    try {
        const { notes } = req.body;

        if (!Array.isArray(notes) || notes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Notes array is required and cannot be empty"
            });
        }

        const newNotes = await Note.insertMany(notes);

        res.status(201).json({
            success: true,
            message: `${notes.length} notes created successfully`,
            data: newNotes
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.replaceNote = async (req, res) => {
    try {
        const { id } = req.params;

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const { title, content, category, isPinned } = req.body;

        if (
            title === undefined ||
            content === undefined ||
            category === undefined ||
            isPinned === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for full replacement"
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, category, isPinned },
            { new: true, overwrite: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note replaced successfully",
            data: updatedNote
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update"
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: null
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteBulk = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "IDs array is required and cannot be empty"
            });
        }

        const validIds = ids.filter(id =>
            mongoose.Types.ObjectId.isValid(id)
        );

        if (validIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid IDs provided"
            });
        }

        const result = await Note.deleteMany({
            _id: { $in: validIds }
        });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} notes deleted successfully`,
            data: null
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};