<template>
    <div class="flex gap-5 mt-3">
        <div v-for="item in list" class="flex items-center">
            <input :id="item" name="radio-group" type="radio"  @click="$emit('update:modelValue', $event.target.value)" :value="item" :checked="modelValue == item"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
            <label :for="item" class="ml-3 block text-sm font-medium leading-6 text-gray-900 capitalize">
                {{ item }}
            </label>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["list", "modelValue"]);
const emits = defineEmits(["update:modelValue"]);


</script>
