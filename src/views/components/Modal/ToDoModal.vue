<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                    <form action="" @submit.prevent>
                        <div>
                            <div class="flex justify-between">
                                <h3 class="text-indigo-600 font-semibold">Add User</h3>
                                <XMark class=" hover:cursor-pointer hover:text-red-500" @click="$emit('close')" />
                            </div>
                            <DefaultInput label="Description:" type="text" v-model="formData.description"
                                :error="formData.description_error" />
                            <RadioGroup :list="todoStatus" v-model="formData.status" />
                        </div>
                        <div class="mt-5 sm:mt-6 flex gap-4">
                            <DefaultButton label="Cancel" class="bg-gray-500 hover:bg-gray-400"
                                @click="$emit('close')" />
                            <DefaultButton :is-loading="isLoading" :label="item ? 'Update' : 'Create'"
                                @click="item ? updateTodo() : createTodo()" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import DefaultInput from '@/views/components/Inputs/DefaultInput.vue';
import RadioGroup from '@/views/components/Radio/RadioGroup.vue';
import { inject, onMounted, ref } from 'vue';
import axios from '@/lib/axios';

const props = defineProps({
    item: {
        default: null,
    }
});
const emits = defineEmits(['close'])
const message = inject("message");

const todoStatus = ['ongoing', 'done'];
const isLoading = ref(false);
const formData = ref({
    id: null,
    description: "",
    status: "ongoing",
    description_error: null,
    status_error: null,
});

const updateTodo = () => {
    isLoading.value = true;
    formData.value["description_error"] = null;
    formData.value["status_error"] = null;
    axios.put("/api/todos/" + formData.value.id, formData.value).then(response => {
        message.value = response.data.message;
        emits('close');
    }).catch(error => {
        console.error(error?.response?.data?.message);
        const errors = error?.response?.data?.errors;
        if(errors) {
            formData.value["description_error"] = errors["description"]?.join();
            formData.value["status_error"] = errors["status"]?.join();
        }
    }).finally(() => {
        isLoading.value = false;
    });
}

const createTodo = () => {
    isLoading.value = true;
    formData.value["description_error"] = null;
    formData.value["status_error"] = null;
    axios.post("/api/todos", formData.value).then(response => {
        console.log(response.data.message)
        message.value = response.data.message;
        emits('close');
    }).catch(error => {
        console.error(error?.response?.data?.message);
        const errors = error?.response?.data?.errors;
        if(errors) {
            formData.value["description_error"] = errors["description"]?.join();
            formData.value["status_error"] = errors["status"]?.join();
        }
    }).finally(() => {
        isLoading.value = false;
    });
}

onMounted(() => {
    if (props.item) {
        formData.value["id"] = props.item["id"];
        formData.value["description"] = props.item["description"];
        formData.value["status"] = props.item["status"];
    }
});
</script>