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

exports.createBulk=async(req,res)=>{
    try{
        const newNotes=await Note.insertMany(req.body["notes"]);
        const length=req.body["notes"].length;
        res.status(201).json({
            success: true,
            message: `${length} notes created successfully`,
            data: newNotes
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAll=async(req,res)=>{
    try{
        const notes=await Note.find();
        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.getById=async(req,res)=>{
    try{
        const note=await Note.find({_id:req.params.id});
        res.status(200).json({
            "success": true,
            "message": "Note fetched successfully",
            "data": note
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.replaceNote = async (req, res) => {
    try {
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
            req.params.id,
            {
                title,
                content,
                category,
                isPinned
            },
            {
                new: true,
                overwrite: true,
                runValidators: true
            }
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
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update"
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
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