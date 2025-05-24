import Note from "../models/modelsNotes.js";
import {
    successResponse,
    errorResponse
} from "../utils/utilsResponseHandler.js";

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        successResponse(res, notes, "Notes retrieved successfully");
    } catch (error) {
        errorResponse(res, "Failed to retrieve notes");
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findOne({ where: { id } });

        if (!note) {
            return errorResponse(res, "Note not found", 404);
        }

        successResponse(res, note, "Note retrieved successfully");
    } catch (error) {
        errorResponse(res, "Failed to retrieve note", 500);
    }
};

const createNote = async (req, res) => {
    try {
        
        console.log("📥 Body:", req.body);
        console.log("🔐 req.user:", req.user);

        // const { user_id, title, content } = req.body;
        const { title, content } = req.body;
        const user_id = req.users.id;

        const note = await Note.create({ user_id, title, content });
        successResponse(res, note, "Note created successfully", 201);
    } catch (error) {
        errorResponse(res, "Failed to create note");
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await Note.update({ title, content }, { where: { id } });
        successResponse(res, null, "Note updated successfully");
    } catch (error) {
        errorResponse(res, "Failed to update note");
    }
    
}

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.destroy({ where: { id } });
        successResponse(res, null, "Note deleted successfully");
    } catch (error) {
        errorResponse(res, "Failed to delete note");
    }
};

export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};