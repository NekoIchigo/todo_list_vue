<template>
    <main class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
        <div class="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            <nav class="mt-10 flex gap-4">
                <RouterLink to="/home" class="hover:text-indigo-600">Home</RouterLink>
                <RouterLink to="/todo" class="hover:text-indigo-600">Todo</RouterLink>
                <button @click="logout()" class="hover:text-indigo-600">Log out</button>
            </nav>
        </div>
        <RouterView />
    </main>
</template>

<script setup>
import axios from '@/lib/axios';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  axios.post("/api/logout").then((response) => {
    router.push("/");
  }).catch((error) => {
    console.error(error?.response?.data?.message);
  });
}
</script>