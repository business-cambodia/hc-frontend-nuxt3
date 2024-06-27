<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 px-7 py-8 mb-5">
    <div class="rounded-lg overflow-hidden">
      <div class="relative h-full">
        <img
          :src="articles[0].image"
          alt=""
          class="w-full h-full object-cover"
        />
        <div
          class="absolute bg-black bg-opacity-50 w-full h-full top-0 flex flex-col justify-end p-4"
        >
          <div class="bg-primary text-white p-2 rounded-xl">
            <div class="flex justify-between mt-2">
              <span class="text-sm">#{{ articles[0].category.name }}</span>
              <span class="text-sm">{{
                $formatDate(articles[0].date_created)
              }}</span>
            </div>
            <h1 class="text-lg font-bold line-clamp-2">
              {{ articles[0].title }}
            </h1>
            <div class="flex gap-x-8 mt-2">
              <span class="text-sm">
                <i class="fa-solid fa-eye"></i>
                {{ $kFormatter(articles[0].views) }} views
              </span>
              <span class="text-sm">
                <i class="fa-solid fa-user"></i>
                {{ articles[0].user_created.first_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-rows-2 gap-y-4">
      <div class="rounded-lg overflow-hidden">
        <div class="relative h-full">
          <img
            :src="articles[1].image"
            alt=""
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bg-black bg-opacity-50 w-full h-full top-0 flex flex-col justify-end p-4"
          >
            <div class="bg-primary text-white p-2 rounded-xl">
              <div class="flex justify-between mt-2">
                <span class="text-sm">#{{ articles[1].category.name }}</span>
                <span class="text-sm">{{
                  $formatDate(articles[1].date_created)
                }}</span>
              </div>
              <h1 class="text-lg font-bold line-clamp-2">
                {{ articles[1].title }}
              </h1>
              <div class="flex gap-x-8 mt-2">
                <span class="text-sm">
                  <i class="fa-solid fa-eye"></i>
                  {{ $kFormatter(articles[1].views) }} views
                </span>
                <span class="text-sm">
                  <i class="fa-solid fa-user"></i>
                  {{ articles[1].user_created.first_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-4">
        <div
          v-for="(article, index) in articles.slice(2, 4)"
          :key="index"
          class="rounded-lg overflow-hidden"
        >
          <div class="relative h-full">
            <img
              :src="article.image"
              alt=""
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bg-black bg-opacity-50 w-full h-full top-0 flex flex-col justify-end p-4"
            >
              <div class="bg-primary text-white p-2 rounded-xl">
                <div class="flex justify-between mt-2">
                  <span class="text-sm">#{{ article.category.name }}</span>
                  <span class="text-sm">{{
                    $formatDate(article.date_created)
                  }}</span>
                </div>
                <h1 class="text-lg font-bold line-clamp-2">
                  {{ article.title }}
                </h1>
                <div class="flex gap-x-8 mt-2">
                  <span class="text-sm">
                    <i class="fa-solid fa-eye"></i>
                    {{ $kFormatter(article.views) }} views
                  </span>
                  <span class="text-sm">
                    <i class="fa-solid fa-user"></i>
                    {{ article.user_created.first_name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';
function defineProps<T>() {
  throw new Error('Function not implemented.');
}

const props = defineProps<{
  articles: IArticle[];
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

<style scoped></style>
