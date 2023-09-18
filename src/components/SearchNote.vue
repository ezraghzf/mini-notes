<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
defineProps({
    modelValue: {
        type: String,
    }
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <div class="w-full h-full bg-slate-100 rounded-lg p-4 inline-flex flex-row gap-2">
        <MagnifyingGlassIcon class="w-6 text-black"></MagnifyingGlassIcon>
        <input placeholder="Search title" class="w-full bg-transparent focus:outline-none" type="search" name="search-note"
            id="search-note" :value="modelValue" @input="updateValue">
    </div>
</template>
