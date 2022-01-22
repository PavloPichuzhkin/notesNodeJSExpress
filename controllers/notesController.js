import NotesService from "../services/notesService.js";

const notesService = new NotesService();

export const createNote = async (req, res) => {
    try {
        const note = await notesService.createNote(req.body);
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const getNotes = async (req, res) => {
    try {
        const notes = await notesService.getNotes();
        return res.status(200).json(notes)
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const getNote = async (req, res) => {
    try {
        const note = await notesService.getNote(+req.params.id);
        return res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const deleteNote = async (req, res) => {
    try {
        const note = await notesService.deleteNote(+req.params.id);
        return res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const archiveNote = async (req, res) => {
    try {
        const note = await notesService.archiveNote(+req.params.id);
        return res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const getArchivedNotes = async (req, res) => {
    try {
        const archivedNotes = await notesService.getArchivedNotes();
        return res.status(200).json(archivedNotes);
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const unzipNote = async (req, res) => {
    try {
        const unzipNote = await notesService.unzipNote(+req.params.id);
        return res.status(200).json(unzipNote);
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const getStats = async (req, res) => {
    try {
        const stats = await notesService.getStats();
        return res.status(200).json(stats);
    } catch (error) {
        res.status(500).json(error);
    }
}
export  const editNote = async (req, res) => {
    try {
        const editNote = await notesService.editNote(req.body, +req.params.id);
        return res.status(200).json(editNote);
    } catch (error) {
        res.status(500).json(error);
    }
}