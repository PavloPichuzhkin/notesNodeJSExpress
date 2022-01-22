import Repository from "../repositories/notesRepository.js";
import { object, string, number, date , } from "yup";

const repository = new Repository();
let count=6;

class NotesService {
    constructor() {
        this.schema = object({
            // created: date(),
            created: string().required(),
            category: string().required(),
            content: string().required(),
            dates: string(),
        }).noUnknown();
    }
    async createNote(note) {
            this.schema.validate(note,{
            strict: true,
            stripUnknown: true })
        const createdNote = await repository.createNote({ ...note, id: count++ });
        return createdNote;
    }
    async editNote(note, id) {
        if (!id) {
            throw new Error("Id not entered");
        }

        await this.schema.validate(note,{
            strict: true,
            stripUnknown: true });
        const notes = repository.getNotes();
        const findIndex = notes.findIndex((note) => note.id === id);
        if (findIndex < 0) {
            throw new Error(`Note with id= ${id} does not exist`);
        }
        const editNote=repository.editNote({ ...note, id }, findIndex);
        return editNote
    }
    async getNotes() {
        const notes = repository.getNotes();
        return notes;
    }
    async getNote(id) {
        if (!id) {
            throw new Error("Id not entered");
        }
        const notes = repository.getNotes();
        const findIndex = notes.findIndex(note => note.id === id);
        if (findIndex < 0) {
            throw new Error(`Note with id= ${id} does not exist`);
        }
        const note = repository.getByIndex(findIndex);
        return note;
    }
    async getStats() {
        const notes = repository.getNotes();
        const archivedNotes = repository.getArchivedNotes();
        console.log(archivedNotes)
        let counter = 1;

        function getCategoriesCount(notes) {
            let categories = [],
                categoriesCount = {};
            for (let i = 0; i < notes.length; i++) {
                categories.push(notes[i].category);
            }
            categories.forEach((item) => {
                categoriesCount[item] = (categoriesCount[item] || 0) + 1;
            });
            return categoriesCount;
        }

        function uniqueCategories(notes) {
            let categories = [];
            for (let key in notes) {
                if (notes.hasOwnProperty(key)) {
                    for (let i = 0; i < notes[key].length; i++) {
                        if (notes[key][i].hasOwnProperty("category")) {
                            categories.push(notes[key][i].category);
                        }
                    }
                }
            }
            categories = [...new Set(categories)];
            return categories;
        }

        function categoriesCalc() {
            let categories = uniqueCategories({notes, archived:archivedNotes});
            let active = getCategoriesCount(notes);
            let archived = getCategoriesCount(archivedNotes);
            let summary = categories.map((item) => {
                let activeCategory = !active[item] ? 0 : active[item];
                let archivedCategory = !archived[item] ? 0 : archived[item];

                return {
                    id: counter++,
                    category: item,
                    total: activeCategory + archivedCategory,
                    active: activeCategory,
                    archived: archivedCategory,
                };
            });
            return { summary };
        }
        return categoriesCalc().summary;
    }

    async deleteNote(id) {
        if (!id) {
            throw new Error("Id not entered");
        }
        const notes = repository.getNotes();
        const deleteIndex = notes.findIndex((note) => note.id === id);
        if (deleteIndex < 0) {
            throw new Error(`Note with id= ${id} does not exist`);
        }
        const deleteNote = repository.deleteNote(deleteIndex);
        return deleteNote;
    }
    async archiveNote(id) {
        if (!id) {
            throw new Error("Id not entered");
        }
        const notes = repository.getNotes();

        const archivedIndex = notes.findIndex((note) => note.id === id);
        if (archivedIndex < 0) {
            throw new Error(`Note with id= ${id} does not exist`);
        }
        const deleteNote = repository.deleteNote(archivedIndex);
        repository.archiveNote(deleteNote);
        return deleteNote;
    }
    async unzipNote(id) {
        if (!id) {
            throw new Error("Id not entered");
        }
        const notes = repository.getArchivedNotes();
        const unzipIndex = notes.findIndex((note) => note.id === id);
        if (unzipIndex < 0) {
            throw new Error(`Note with id= ${id} does not exist`);
        }
        const unzipNote = repository.deleteFromArchive(unzipIndex);
        repository.unzipNote(unzipNote);
        return unzipNote;
    }
    async getArchivedNotes() {
        const archivedNotes = repository.getArchivedNotes();
        return archivedNotes;
    }
}

export default NotesService;
