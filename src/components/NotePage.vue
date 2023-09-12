<script setup>
import { useNoteStore } from '../stores/note';
const { activeNote, editNote } = useNoteStore()
// const noteData = ref({
//     id: Date.now().toString(),
//     title: '',
//     note: '',
// })
function autoSave() {
    editNote()
}

</script>

<template>
    <div class="w-full h-full bg-white rounded-lg p-4 flex flex-col">
        <div class="invisible">Buttons</div>
        <div class="w-full">
            <input placeholder="Title" class="w-full font-bold text-lg" type="text" name="noteTitle" id="noteTitle"
                v-model="activeNote.title" @input="autoSave()">
        </div>
        <div class="w-100 border-b-2 my-4"></div>
        <div class="grow">
            <textarea placeholder="Write something" name="noteText" id="noteText" class="w-full resize-none h-full"
                v-model="activeNote.note" @input="autoSave()" />
        </div>
    </div>
</template>
