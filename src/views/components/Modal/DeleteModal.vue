<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <form action="" @submit.prevent>
                        <h3 class="text-lg text-red-500 font-semibold">Delete Item</h3>
                        <p>{{ message }}</p>
                        <div class="mt-5 sm:mt-6 flex gap-4">
                            <DefaultButton label="Cancel" class="bg-gray-500 hover:bg-gray-400"
                                @click="$emit('close')" />
                            <DefaultButton :is-loading="isLoading" label="Delete" class="bg-red-500 hover:bg-red-400" @click="$emit('confirm')" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
const props = defineProps(["message"]);
const emits = defineEmits(['close', 'confirm']);

</script>
