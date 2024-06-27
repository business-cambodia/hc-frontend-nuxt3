<template>
  <div v-if="articles !== undefined && articles.length">
    <div class="px-4 lg:px-10 py-12">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button class="bg-green-600 text-white font-bold py-2 px-4 rounded">
            {{ title }}
          </button>
          <div class="flex-1 border-t-2 border-green-600 mx-4"></div>
        </div>
        <NuxtLink :to="to" class="text-gray-600 hover:text-gray-800 font-medium">
          មើល​បន្ថែម​
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 mt-6 items-center">
        <div v-for="(a, index) in articles" :key="index" data-aos="fade-up">
          <ReusablesArticleCard :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';


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
.flex-1 {
  flex: 1;
}
.border-t-2 {
  border-top-width: 2px;
}
.text-gray-600 {
  color: #718096;
}
.text-gray-800 {
  color: #2D3748;
}
.hover\:text-gray-800:hover {
  color: #2D3748;
}
</style>
