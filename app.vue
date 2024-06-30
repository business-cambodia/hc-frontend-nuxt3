<template>
  <NuxtLoadingIndicator :duration="5000" color="#049900" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import AOS from 'aos'
  onMounted(() => {
    AOS.init()
  })
</script>
