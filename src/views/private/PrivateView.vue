<template>
  <main class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
    <div class="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
      <nav class="mt-10 flex gap-4">
        <RouterLink to="/todo" @click="message = null" class="hover:text-indigo-600">Home</RouterLink>
        <RouterLink v-if="userType == 'admin'" to="/home" @click="message = null" class="hover:text-indigo-600">User Management</RouterLink>
        <button @click="logout()" class="hover:text-indigo-600">Log out</button>
      </nav>
    </div>
    <RouterView />
  </main>
</template>

<script setup>
import axios from '@/lib/axios';
import { inject } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();
const userType = inject("userType");
const message = inject("message");

const logout = () => {
  axios.post("/api/logout").then((response) => {
    message.value = null;
    router.push("/");
  }).catch((error) => {
    console.error(error?.response?.data?.message);
  });
}
</script>