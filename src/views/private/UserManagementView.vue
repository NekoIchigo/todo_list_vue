<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <div>
      <p class="text-indigo-600 text-3xl my-5 text-center">
        User Management
      </p>
      <div v-if="!isLoading" class="flex justify-between ">
        <DefaultButton class="w-28 mb-5" label="Add User" @click="selectUser(null)" />
        <div class="flex gap-5 h-10">
          <ChevronLeft v-if="page > 1" class="text-indigo-600 rounded-md p-2 hover:cursor-pointer" @click="prevPage" />
          <ChevronRight v-if="page < lastPage" class="text-indigo-600 rounded-md p-2 hover:cursor-pointer"
            @click="nextPage" />
        </div>
      </div>
      <div v-if="isLoading" class="mt-10 flex gap-2 items-center justify-center animate-pulse">
        <ArrowPath class="animate-spin text-indigo-600" />
        <p class="text-indigo-600">Loading ...</p>
      </div>
    </div>
    <UserList v-if="!isLoading" :list="userList" @click="selectUser($event)" @delete="showDeleteConfirmation" />
    <UserModal v-if="isModalOpen" @close="close()" :item="selectedUser" />
    <DeleteModal v-if="isDeleteShow" @close="isDeleteShow = false"
      :message="`Delete this user : ${selectedUser['username']} ?`" @confirm="deleteUser()" />
  </div>
</template>

<script setup>
import axios from '@/lib/axios';
import UserList from '@/views/components/Lists/UserList.vue';
import ArrowPath from '@/views/components/Icons/ArrowPath.vue';
import { inject, onMounted, ref } from 'vue';
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import UserModal from '@/views/components/Modal/UserModal.vue';
import ChevronLeft from '@/views/components/Icons/ChevronLeft.vue';
import ChevronRight from '@/views/components/Icons/ChevronRight.vue';
import DeleteModal from '@/views/components/Modal/DeleteModal.vue';

const userList = ref([]);
const isLoading = ref(false);
const isModalOpen = ref(false);
const isDeleteShow = ref(false);
const selectedUser = ref(null);
const page = ref(1);
const lastPage = ref(1);
const message = inject("message");

const fetchUserList = () => {
  isLoading.value = true;
  axios.get("/api/users?page=" + page.value).then((response) => {
    lastPage.value = response.data.data["last_page"];
    userList.value = response.data.data.data;
  }).catch((error) => {
    console.error(error?.response?.data?.message);
  }).finally(() => {
    isLoading.value = false;
  });
}

const showDeleteConfirmation = (event) => {
  selectedUser.value = event;
  isDeleteShow.value = true;
}

const nextPage = () => {
  if (page.value < lastPage.value) {
    page.value++;
    fetchUserList();
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchUserList();
  }
}

const selectUser = (event) => {
  isModalOpen.value = true;
  selectedUser.value = event;
}

const deleteUser = () => {
  isLoading.value = true;
  isDeleteShow.value = false
  axios.delete("/api/users/" + selectedUser.value.id).then(response => {
    message.value = response.data.message;

    fetchUserList();
  }).catch(error => {
    console.error(error?.response?.data?.message);
  }).finally(() => {
    isLoading.value = false;
  });
}

const close = () => {
  isModalOpen.value = false;
  fetchUserList();
}
onMounted(() => {
  fetchUserList();
});
</script>
