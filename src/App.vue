<script setup>
import { provide, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const userType = ref("user");
provide('userType', userType)
</script>

<template>
  <RouterView />
</template>

