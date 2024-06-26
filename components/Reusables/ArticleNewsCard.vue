<template>
  <NuxtLink :to="`/articles/${article.slug}`">
    <div
      class="border flex border-primary rounded-2xl gap-x-3 h-40 overflow-hidden"
    >
      <div class=" w-[400px] h-full">
        <img
          :src="useImg(article.thumbnail)"
          class="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div class="w-[800px]  h-full py-2 pr-4">
        <div class="flex justify-between">
          <span class="p-2 bg-primary rounded-xl text-white">
            #{{ article?.category?.name }}</span
          >
          <span class="text-sm text-gray-500">
            {{ $formatDate(article.date_created) }}</span
          >
        </div>
        <div class="pt-2">
          <h1 class="text-lg font-bold text-gray-800 line-clamp-2">
            {{ article?.title }}
          </h1>
        </div>
        <div class="flex gap-x-5 pt-2">
          <span class="text-sm text-gray-700">
            <i class="fa-solid fa-eye"></i>
            {{ $kFormatter(article.views) }} views</span
          >
          <span class="text-sm text-gray-700">
            <i class="fa-solid fa-user"></i>
            {{
              article?.user_created?.first_name +
              ' ' +
              article?.user_created?.last_name
            }}</span
          >
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IArticle } from '~~/types/article';
defineProps<{
  article: IArticle;
}>();
function useImg(url: string): string {
  return url || 'https://via.placeholder.com/150';
}

function $formatDate(date: string | Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date.toString()).toLocaleDateString(undefined, options);
}

function $kFormatter(num: number): string {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();
}
function defineProps<T>() {
  throw new Error('Function not implemented.');
}
</script>

<style scoped></style>
