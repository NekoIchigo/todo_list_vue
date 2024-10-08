<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="text-indigo-600 text-3xl my-5 text-center">To Do List (Laravel & Vue.js)</h1>
      <form class="space-y-6" action="#" method="POST" @submit.prevent>
        <DefaultInput label="Username" type="text" v-model="formData.username" />
        <DefaultInput label="Password" type="password" v-model="formData.password" />
        <div>
          <DefaultButton label="Log in" @click="login()" :isLoading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from '@/lib/axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import DefaultInput from '@/views/components/Inputs/DefaultInput.vue';

const router = useRouter();
const isLoading = ref(false);
const formData = ref({
  username: "",
  password: "",
});

const login = () => {
  isLoading.value = true;
  axios.get("/sanctum/csrf-cookie");

  axios.post('/api/login', formData.value).then((response) => {
    router.push('/home');
  }).catch((error) => {
    console.error("error: " + error);
  }).finally(() => {
    isLoading.value = false;
  });
}


</script>