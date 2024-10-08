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
                            <DefaultInput label="Username:" type="text" v-model="formData.username"
                                :error="formData.username_error" />
                            <DefaultInput label="First Name:" type="text" v-model="formData.first_name"
                                :error="formData.first_name_error" />
                            <DefaultInput label="Last Name:" type="text" v-model="formData.last_name"
                                :error="formData.last_name_error" />
                            <DefaultInput label="Email:" type="email" v-model="formData.email"
                                :error="formData.email_error" />
                            <RadioGroup :list="userTypes" v-model="formData.user_type" />
                        </div>
                        <div class="mt-5 sm:mt-6 flex gap-4">
                            <DefaultButton label="Delete" class="bg-red-500 hover:bg-red-400"
                                @click="$emit('close')" />
                            <DefaultButton :is-loading="isLoading" :label="item ? 'Update' : 'Create'"
                                @click="item ? updateUser() : createUser()" />
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
import XMark from '@/views/components/Icons/XMark.vue';
import RadioGroup from '@/views/components/Radio/RadioGroup.vue';
import { onMounted, ref } from 'vue';
import axios from '@/lib/axios';

const props = defineProps({
    item: {
        default: null,
    }
});

const formData = ref({
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    user_type: "user",
    email: "",
    username_error: null,
    first_name_error: null,
    last_name_error: null,
    user_type_error: null,
    email_error: null,
});

const isLoading = ref(false);
const userTypes = ['admin', 'user'];
const emits = defineEmits(['close']);

const updateUser  = () => {
    isLoading.value = true;
    axios.put("/api/users/" + formData.value.id, formData.value).then(response => {
        console.log(response)
    }).catch(error => {
        console.error(error?.response?.data?.message);
    }).finally(() => {
        isLoading.value = false;
    });
}

const createUser = () => {
    isLoading.value = true;
    axios.post("/api/users", formData.value).then(response => {
        console.log(response)
    }).catch(error => {
        console.error(error?.response?.data?.message);
    }).finally(() => {
        isLoading.value = false;
    });
}

onMounted(() => {
    if (props.item) {
        formData.value["id"] = props.item["id"];
        formData.value["username"] = props.item["username"];
        formData.value["first_name"] = props.item["user_detail"]["first_name"];
        formData.value["last_name"] = props.item["user_detail"]["last_name"];
        formData.value["user_type"] = props.item["user_type"];
        formData.value["email"] = props.item["user_detail"]["email"];
    }
})
</script>