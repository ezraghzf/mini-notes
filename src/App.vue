<script setup>
import NoteListItem from './components/NoteListItem.vue';
import NotePage from './components/NotePage.vue';
import SearchNote from './components/SearchNote.vue';
import { useNoteStore } from './stores/note';

const { activeNote, notesList, ...noteStore } = useNoteStore()

</script>

<template>
  <main class="flex gap-4 h-screen p-4">
    <div class="w-3/12 flex flex-col">
      <div class="mb-4">
        <SearchNote />
      </div>
      <div>
        <button @click="noteStore.newNote()" class="w-full bg-orange-500 rounded-xl py-4 text-white">New Note</button>
      </div>
      <div class="gap-4 flex flex-col h-full overflow-y-auto">
        <NoteListItem v-for="noteItem in notesList" :note="noteItem" :key="noteItem.id" />
      </div>
    </div>
    <div class="w-9/12">
      <NotePage v-if="activeNote.id" />
      <div v-else>
        No notes, please add one
      </div>
    </div>
  </main>
</template>

<style scoped></style>
