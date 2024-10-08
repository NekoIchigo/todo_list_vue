<script setup>
import { provide, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const userType = ref("user");
const userId = ref(null);
provide('userType', userType)
provide('userId', userId)
</script>

<template>
  <RouterView />
</template>

