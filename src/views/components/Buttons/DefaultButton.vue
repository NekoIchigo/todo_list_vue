<template>
    <button type="submit" @click.prevent="login" @click="$emit('click')"
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <div v-if="isLoading" class="flex gap-2 items-center justify-center">
            <ArrowPath class="animate-spin" />
            <p>Loading</p>
        </div>
        <div v-else>
            {{ label }}
        </div>
    </button>
</template>

<script setup>
import ArrowPath from '@/views/components/Icons/ArrowPath.vue';

const props = defineProps(['label', 'isLoading']);
const emit = defineEmits(['click']);

</script>

<style lang="scss" scoped></style>