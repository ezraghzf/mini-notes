import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useNoteStore = defineStore('note', () => {
  const activeNote = ref({
    id: '',
    title: '',
    note: ''
  })
  const notesList = useStorage('notes', [])
  const activeNoteIndex = computed(() => {
    if (!activeNote.value.id) {
      return ''
    }
    const index = notesList.value.findIndex((note) => note.id == activeNote.value.id)
    return index
  })
  const noteSearchQuery = ref('')
  const filteredNotesList = computed(() => {
    if (!noteSearchQuery.value) {
      return notesList.value
    }
    const filtered = notesList.value.filter((note) => {
      if (note.title.match(noteSearchQuery.value)) {
        return note
      }
    })
    return filtered
  })

  function newNote() {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      note: ''
    }
    Object.assign(activeNote.value, newNote)
    notesList.value.push(newNote)
  }
  function saveNote() {
    notesList.value.push({ ...activeNote.value })
  }
  function editNote() {
    notesList.value.splice(activeNoteIndex.value, 1, { ...activeNote.value })
  }
  function searchNote(query) {
    noteSearchQuery.value = query
  }
  function setEditNote(noteId) {
    const index = notesList.value.findIndex((note) => note.id == noteId)
    Object.assign(activeNote.value, notesList.value[index])
  }
  function closeNote() {
    Object.assign(activeNote.value, {
      id: '',
      title: '',
      note: ''
    })
  }
  function deleteNote(noteId) {
    const index = notesList.value.findIndex((note) => note.id == noteId)
    if (noteId == activeNote.value.id) {
      Object.assign(activeNote.value, {
        id: '',
        title: '',
        note: ''
      })
    }
    notesList.value.splice(index, 1)
  }
  function loadNotes() {
    if (notesList.value.length > 0) {
      Object.assign(activeNote.value, notesList.value[0])
    }
  }

  return {
    activeNote,
    notesList,
    noteSearchQuery,
    filteredNotesList,
    newNote,
    saveNote,
    loadNotes,
    editNote,
    setEditNote,
    closeNote,
    searchNote,
    deleteNote
  }
})
