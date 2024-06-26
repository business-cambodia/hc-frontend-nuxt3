<template>
  <div class="md:px-4">
    <div class="flex justify-between mx-4 my-8">
      <span
        class="bg-primary text-white px-2 py-1 rounded-xl text-xl font-bold"
        >{{ title }}</span
      >
      <NuxtLink
        :to="to"
        class="text-gray-600 underline hover:text-gray-800 font-medium"
      >
        មើល​បន្ថែម​
      </NuxtLink>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-2 w-full mx-auto gap-6"
      data-aos="fade-up"
    >
      <ReusablesArticlePsychologyCard
        v-for="(a, index) in articles"
        :key="index"
        :article="a"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~~/types/article';
// import { defineProps } from 'vue';
defineProps({
  articles: {
    type: Array<IArticle>,
    required: true,
  },
  title: String,
  to: String,
});
</script>

<style scoped>
/* d */
</style>
