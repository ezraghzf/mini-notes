<script setup>
import { useNoteStore } from '../stores/note';
const noteStore = useNoteStore();
const props = defineProps({
    note: {
        type: Object,
        required: true,
    }
})
function setActiveNote() {
    Object.assign(noteStore.activeNote, props.note);
}
</script>

<template>
    <div class="bg-white rounded-lg p-4 hover:bg-gray-200" @click="setActiveNote()">
        <div>
            <h2 class="font-bold text-lg">{{ note.title || 'Untitled Note' }}</h2>
        </div>
        <div class="max-h-24 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ note.note }}
        </div>
    </div>
</template>
