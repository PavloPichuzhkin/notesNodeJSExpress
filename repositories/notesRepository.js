import {addDate} from "../utils/parseDates.js";

class Repository {
    constructor() {
        this.notes = addDate([
            {
                id: 1,
                created: "13.10.2021",
                category: "Task",
                content: "Buy tomatoes, bread 30.12.2021 and 31/12/2021",
            },

            {
                id: 2,
                created: "13.10.2021",
                category: "Idea",
                content: "Travel to Egypt 05.01.2022",
                dates: "30.10.2021",
            },
            {
                id: 3,
                created: "13.10.2021",
                category: "Random Thought",
                content: "To find new interesting film 14/01/2022",
                dates: "",
            },
            {
                id: 4,
                created: "13.10.2021",
                category: "Task",
                content: "change tyres 15.10.2021",
                dates: "",
            },
            {
                id: 5,
                created: "13.10.2021",
                category: "Idea",
                content: "maybe some sleep",
                dates: " ",
            },
        ])

        this.archivedNotes = []
    }
    createNote(note) {
        if (!note) {
            throw new Error('Note must not to be null or undefined value')
        }
        this.notes.push(...addDate([note]));
        return note;
    }
    getNotes() {
        return this.notes;
    }
    editNote(note, index) {
        return this.notes[index] = addDate([note ])[0];
    }
    getByIndex(index) {
        return this.notes[index];
    }
    deleteNote(index) {
        return (this.notes.splice(index, 1))[0];
    }
    deleteFromArchive(index) {
        return (this.archivedNotes.splice(index, 1))[0];
    }
    archiveNote(archiveNote) {
        this.archivedNotes.push(archiveNote);
    }
    unzipNote(unzipNote) {
        this.notes.push(unzipNote);
    }

    getArchivedNotes() {
        return this.archivedNotes;
    }
}

export default Repository;