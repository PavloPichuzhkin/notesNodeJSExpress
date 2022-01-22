import {Router} from "express";
import {createNote, getNotes, getNote, deleteNote, archiveNote, getArchivedNotes, unzipNote, getStats, editNote}
    from "../controllers/notesController.js";

const router = new Router();

router.post("/notes", createNote);
router.get("/notes", getNotes);
router.get("/notes/:id", getNote);

router.delete("/notes/:id", deleteNote);
router.delete("/archivenote/:id",archiveNote);
router.delete("/unzipnote/:id",unzipNote);
router.get("/archivednotes", getArchivedNotes);

router.patch("/notes/:id", editNote);
// router.put("/notes/:id", editNote);
router.get("/stats", getStats);


export default router;