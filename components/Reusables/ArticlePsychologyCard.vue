<template>
  <NuxtLink :to="`/articles/${article.slug}`">
    <div class="relative overflow-hidden rounded-lg shadow-lg h-[600px]">
      <img
        :src="article.image"
        alt="Card Image"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white"
      >
        <div class="text-sm">   #{{ article.category.name }}</div>
        <div class="text-lg font-bold line-clamp-2">{{ article.title }}</div>

        <div class="flex items-center mt-4">
          <img
            :src="useImg(article.user_created.avatar)"
            alt="Author Image"
            class="w-8 h-8 rounded-full mr-2"
          />
          <span class="text-sm">
            {{
                article.user_created.first_name +
                ' ' +
                article.user_created.last_name
              }}</span
          >
        </div>
        <div class="text-sm flex justify-between mt-2">
          <span>  {{ $formatDate(article.date_created) }}</span>
          <span>  {{ $kFormatter(article.views) }} views</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';
function defineProps<T>() {
  throw new Error('Function not implemented.');
}

defineProps<{
  article: IArticle;
}>();

function $formatDate(date: string | Date): string {
  if (!date) return ''; // Handle cases where date might be undefined or null
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

function $kFormatter(num: number): string {
  if (isNaN(num)) return '0'; // Handle cases where num might be undefined or not a number
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();
}
</script>
<style scoped>
/* Additional styles if needed */
</style>
