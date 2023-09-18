<script setup>
import { useNoteStore } from '../stores/note';
const noteStore = useNoteStore();
defineProps({
    note: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="bg-white rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
        :class="{ 'border-orange-600 border-2': note.id == noteStore.activeNote.id }"
        @click="noteStore.setEditNote(note.id)">
        <div>
            <h2 class="font-bold text-lg">{{ note.title || 'Untitled Note' }}</h2>
        </div>
        <!-- <div class="max-h-24 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ note.note }}
        </div> -->
    </div>
</template>
