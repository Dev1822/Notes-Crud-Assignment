const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
    try {
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