<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
            <p class="text-indigo-600 text-3xl my-5 text-center">
                To Do List
            </p>
            <DefaultButton v-if="!isLoading" label="Add User" class="mb-5" />
            <div v-if="isLoading" class="mt-10 flex gap-2 items-center justify-center animate-pulse">
                <ArrowPath class="animate-spin text-indigo-600" />
                <p class="text-indigo-600">Loading ...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import ArrowPath from '@/views/components/Icons/ArrowPath.vue';
import { onMounted, ref } from 'vue';


const isLoading = ref(false);


</script>
