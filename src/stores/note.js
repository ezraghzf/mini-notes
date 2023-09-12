import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const storage = useStorage('notes', [])
export const useNoteStore = defineStore('note', () => {
  const activeNote = ref({
    id: '',
    title: '',
    note: ''
  })
  // {
  //   id: Date.now().toString(),
  //   title: '',
  //   note: ''
  // }
  const notesList = ref([])

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
    storage.value = notesList.value
  }
  function editNote() {
    const index = notesList.value.findIndex((note) => note.id == activeNote.value.id)
    notesList.value.splice(index, 1, { ...activeNote.value })
    // const newList = notesList.value.map((note) => {
    //   if (note.id === activeNote.value.id) {
    //     return { ...activeNote.value }
    //   }
    //   return note
    // })
    //notesList.value = newList
    //storage.value = notesList.value
  }
  function loadNotes() {
    notesList.value = storage.value
    if (notesList.value.length > 0) {
      activeNote.value = notesList.value[0]
    }
  }

  return { activeNote, notesList, newNote, saveNote, loadNotes, editNote }
})
