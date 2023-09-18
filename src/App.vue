<script setup>
import { onBeforeMount } from 'vue';
import NoteListItem from './components/NoteListItem.vue';
import NotePage from './components/NotePage.vue';
import SearchNote from './components/SearchNote.vue';
import { useNoteStore } from './stores/note';
import { PencilSquareIcon, PlusIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const note = useNoteStore()
const breakpoints = useBreakpoints(breakpointsTailwind)

onBeforeMount(() => {
  note.loadNotes()
})
const greaterThanMd = breakpoints.greater('md')
</script>

<template>
  <div class="flex gap-4 h-screen p-4">
    <div class="w-full md:w-3/12 flex flex-col gap-4" v-show="greaterThanMd || (!greaterThanMd && !note.activeNote.id)">
      <div>
        <SearchNote v-model="note.noteSearchQuery" />
      </div>
      <div>
        <button @click="note.newNote()"
          class="w-full bg-orange-500 rounded-xl py-4 text-white inline-flex flex-row justify-center">
          <PlusIcon class="w-6 -ml-3 "></PlusIcon>
          New Note
        </button>
      </div>
      <div class="gap-4 flex flex-col h-full overflow-y-auto">
        <div v-show="note.noteSearchQuery" class="text-gray-500 flex justify-between gap-2">
          <div class="text-ellipsis whitespace-nowrap overflow-hidden">Search results for: "{{ note.noteSearchQuery }}"
          </div>
          <button type="button" id="clear-search" title="Clear Search" @click="note.searchNote('')">
            <XCircleIcon class="w-6"></XCircleIcon>
          </button>
        </div>
        <NoteListItem v-for="noteItem in note.filteredNotesList" :note="noteItem" :key="noteItem.id" />
      </div>
    </div>
    <div class="w-full md:w-9/12" v-show="greaterThanMd || (!greaterThanMd && note.activeNote.id)">
      <NotePage v-if="note.activeNote.id" />
      <div v-else class="text-gray-500 font-bold text-xl flex flex-col justify-center align-middle h-full">
        <div class="mx-auto flex flex-col justify-center align-middle gap-4">
          <PencilSquareIcon class="w-20 mx-auto"></PencilSquareIcon>
          <div>Create or select a note</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
