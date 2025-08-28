import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Note {
  id: number;
  title: string;
  content: string;
  lastEdited: string; // Could be a Date object in a real app
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([
    { id: 1, title: 'Shopping List', content: 'Milk, eggs, bread, butter', lastEdited: '07:19' },
    { id: 2, title: 'To Do List', content: 'Finish the UI - Implement the...', lastEdited: '04:19' },
    { id: 3, title: 'another list', content: 'this is yet another list, it f...', lastEdited: 'terça-feira' },
  ]);

  const searchQuery = ref('');

  const filteredNotes = computed(() => {
    if (!searchQuery.value) {
      return notes.value;
    }
    const query = searchQuery.value.toLowerCase();
    return notes.value.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  const totalNotes = computed(() => notes.value.length);

  const getNoteById = computed(() => {
    return (id: number) => notes.value.find(note => note.id === id);
  });

  const createNoteAndGetId = (): number => {
    const newId = notes.value.length > 0 ? Math.max(...notes.value.map(n => n.id)) + 1 : 1;
    const newNote: Note = {
      id: newId,
      title: '',
      content: '',
      lastEdited: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    notes.value.unshift(newNote);
    return newId;
  };

  const deleteNote = (id: number) => {
    notes.value = notes.value.filter(note => note.id !== id);
  };

  const updateNote = (updatedNote: Note) => {
    const index = notes.value.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      notes.value[index] = { 
        ...updatedNote, 
        lastEdited: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
    }
  };

  return {
    notes,
    searchQuery,
    filteredNotes,
    totalNotes,
    getNoteById,
    createNoteAndGetId,
    deleteNote,
    updateNote,
  };
});
