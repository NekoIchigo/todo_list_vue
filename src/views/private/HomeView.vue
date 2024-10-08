<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <div>
      <p class="text-indigo-600 text-3xl my-5 text-center">
        User Management
      </p>
      <DefaultButton v-if="!isLoading" label="Add User" class="mb-5" @click="selectUser(null)" />
      <div v-if="isLoading" class="mt-10 flex gap-2 items-center justify-center animate-pulse">
        <ArrowPath class="animate-spin text-indigo-600" />
        <p class="text-indigo-600">Loading ...</p>
      </div>
    </div>
    <UserList :list="userList" @click="selectUser($event)" />
    <UserModal v-if="isModalOpen" @close="isModalOpen = false" :item="selectedUser" />

  </div>
</template>

<script setup>
import axios from '@/lib/axios';
import UserList from '@/views/components/Lists/UserList.vue';
import ArrowPath from '@/views/components/Icons/ArrowPath.vue';
import { onMounted, ref } from 'vue';
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import UserModal from '@/views/components/Modal/UserModal.vue';

const userList = ref([]);
const isLoading = ref(false);
const isModalOpen = ref(false);
const selectedUser = ref(null);

const fetchUserList = () => {
  isLoading.value = true;
  axios.get("/api/users").then((response) => {
    userList.value = response.data.data.data;
  }).catch((error) => {
    console.error(error?.response?.data?.message);
  }).finally(() => {
    isLoading.value = false;
  });
}

const selectUser = (event) => {
  isModalOpen.value = true;
  selectedUser.value = event;
}

onMounted(() => {
  fetchUserList();
});
</script>
