<template>
  <main class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <p class="text-indigo-600 text-3xl my-5 text-center">User Management</p>
      <UserList :list="userList" />
    </div>
  </main>
</template>

<script setup>
import axios from '@/lib/axios';
import UserList from '@/views/components/Lists/UserList.vue';
import { onMounted, ref } from 'vue';
const userList = ref([]);
const fetchUserList = () => {
  axios.get("/api/users").then((response) => {
    userList.value = response.data.data.data;
  }).catch((error) => {
    console.error(error?.response?.data?.message);
  });
}

onMounted(() => {
  fetchUserList();
});
</script>
