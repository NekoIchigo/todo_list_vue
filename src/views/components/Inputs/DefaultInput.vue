<template>
    <div class="my-3">
        <div class="flex items-center justify-between">
            <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
        </div>
        <div class="mt-2">
            <input :id="name" :name="name" :type="type" :required="isRequired" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @change="$emit('change', $event.target.value)"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
        <div v-if="error" class="text-sm text-red-600 pt-2 pl-1">
            {{ error }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        default: "input_name"
    },
    label: {
        default: "Input Label",
    },
    type: {
        default: "text",
    },
    isRequired: {
        default: false
    },
    error: {
        default: null,
    },
    modelValue: [String, Number, Boolean],
});

const emits = defineEmits(['update:modelValue', , 'change']);
</script>
