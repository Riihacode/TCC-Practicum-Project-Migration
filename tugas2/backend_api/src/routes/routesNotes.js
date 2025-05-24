import express from "express";
import {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/controllersNotes.js";
import verifyAuth from "../middlewares/middlewaresAuth.js"; // Udah ga dipake krn diganti di implementasi ACCESS_TOKEN_SECRET dan REFRES_TOKEN_SECRET di controllersUser.js dan verifyToken.js
import { verifyToken } from "../middlewares/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get("/token", refreshToken);

// router.get("/notes", verifyAuth, getAllNotes);
// router.get("/notes/:id", verifyAuth, getNoteById);
// router.post("/notes", verifyAuth, createNote);
// router.put("/notes/:id", verifyAuth, updateNote);
// router.delete("/notes/:id", verifyAuth, deleteNote);

router.get("/notes", verifyToken, getAllNotes);
router.get("/notes/:id", verifyToken, getNoteById);
router.post("/notes", verifyToken, createNote);
router.put("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

export default router;