import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageURLs: [], //https://foto1.jpg
        // }
    },
    reducers: {
        savingNewNote:(state)=> {
            state.isSaving = true;
        },

        addNewEmpyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ''

        },

        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ''
        },

        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note)
        
            //Mostrar mensaje de actualizacion
            state.messageSaved = `Nota actualizada correctamente: ${action.payload.title}`
            
        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageURLs = [...state.active.imageURLs, ...action.payload]
            state.isSaving = false
        },

        clearnoNotesLogout: (state) => {
            state.setSaving = (false);
            state.messageSaved = '';
            state.notes =[];
            state.active = null;
        },

        deleteNoteById:  (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload.id)
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmpyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearnoNotesLogout
 } = journalSlice.actions;