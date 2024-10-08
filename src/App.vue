<script setup>
import { provide, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const message = ref(null);
const userType = ref("user");
const userId = ref(null);
provide('userType', userType)
provide('userId', userId)
provide('message', message)
</script>

<template>
  <p v-if="message" class="text-center mt-5 text-green-400">Message: {{ message }}</p>
  <RouterView />
</template>

