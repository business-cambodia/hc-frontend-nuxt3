<template>
  <div v-if="articles !== undefined && articles.length">
    <div class="px-4 lg:px-12 mt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button class="bg-green-600 text-white font-bold py-2 px-4 rounded">
            {{ title }}
          </button>
          <div class="flex-1 border-t-2 border-green-600 mx-4"></div>
        </div>
        <NuxtLink
          :to="to"
          class="text-gray-600 hover:text-gray-800 font-medium"
        >
          មើល​បន្ថែម​
          <i class="fa-solid fa-arrow-right-long"></i>
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="articles !== undefined && articles.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-9 py-6"
    >
      <div v-for="(a, index) in articles" :key="index" data-aos="fade-up">
        <ReusablesArticleCard :article="a" />
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center h-96">
        <span class="text-gray-400">មិនមានអត្ថបទនៅឡើយ</span>
      </div>
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
<style scoped></style>
