<script setup>
import { useNoteStore } from '../stores/note';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/vue/24/outline';
import IconButton from './icons/IconButton.vue';
import { useToggle } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

const { activeNote, editNote, ...note } = useNoteStore()
const [isDialogDelete, toggleDelete] = useToggle()

function autoSave() {
    editNote()
}

</script>

<template>
    <div class="w-full h-full bg-white rounded-lg p-4 flex flex-col">
        <div class="flex justify-between mb-4">
            <IconButton @click="note.closeNote()" id="close-note">
                <ArrowLeftIcon class="text-black" />
            </IconButton>
            <div class="relative">
                <IconButton @click="toggleDelete()" id="delete-note">
                    <TrashIcon class="h-6 w-6 text-black" />
                </IconButton>
                <div class="bg-white shadow absolute w-52 right-0 p-4 rounded" v-if="isDialogDelete"
                    v-on-click-outside="() => isDialogDelete = false">
                    Delete this note?
                    <div class="flex flex-row justify-between gap-2">
                        <button type="button" @click="() => isDialogDelete = false" id="delete-note"
                            class="p-2 bg-gray-200 rounded px-4">
                            No
                        </button>
                        <button type="button" @click="note.deleteNote(activeNote.id)"
                            class="p-2  bg-orange-400 rounded text-white px-4   " id="delete-note">
                            Yes
                        </button>

                    </div>

                </div>
            </div>
        </div>
        <div class="w-full">
            <input placeholder="Title" class="w-full font-bold text-lg focus:outline-none" type="text" name="noteTitle"
                id="noteTitle" v-model="activeNote.title" @input="autoSave()">
        </div>
        <div class="w-100 border-b-2 my-4"></div>
        <div class="grow">
            <textarea placeholder="Write something" name="noteText" id="noteText"
                class="w-full resize-none h-full focus:outline-none" v-model="activeNote.note" @input="autoSave()" />
        </div>
    </div>
</template>
