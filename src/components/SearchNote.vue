<script setup>
import { ref } from 'vue'
defineProps({
    note: {
        type: String,
        required: false
    }
})
const search = ref("")
</script>

<template>
    <div class="w-full h-full bg-slate-100 rounded-lg p-4 flex flex-col">
        <input placeholder="Title" class="w-full bg-transparent" type="text" name="bang" id="bang" v-bind="search"
            @change="$emit('search', search)">
    </div>
</template>
