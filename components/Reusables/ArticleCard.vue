<template>
  <NuxtLink :to="`/articles/${article.slug}`">
    <div
      class="filter overflow-hidden pb-5 shadow-xl hover:shadow-primary hover:shadow-sm rounded-2xl transition-all duration-300  flex flex-col justify-between h-auto max-w-full group cursor-pointer text-start"
    >
      <div>
        <div class="relative h-44 overflow-hidden bg-no-repeat bg-contain">
          <img
            :src="useImg(article.thumbnail)"
            alt=""
            class="object-cover h-full rounded w-full group-hover:scale-110 transition duration-300 ease-in-out"
          />
        </div>
        <div class="p-4">
          <NuxtLink
            :to="'/categories/' + article?.category?.slug"
            class=" text-xs inline-flex items-center font-normal leading-sm uppercase px-2 py-0.5  bg-primary text-white p-1 rounded"
          >
            #{{ article?.category?.name }}
          </NuxtLink>
          <div
            class="font-bold text-base mt-2 text-gray-600 line-clamp-2 hover:underline cursor-pointer"
          >
            {{ article?.title }}
          </div>
        </div>
      </div>
      <div class="flex w-full items-end justify-between pt-2 p-4">
        <div class="flex items-center">
          <div>
            <div class="w-12 h-12 mr-4 rounded-full">
              <img
                :src="useImg(article?.user_created?.avatar)"
                alt=""
                class="object-cover h-full w-full rounded-full"
              />
            </div>
          </div>

          <div class="w-full text-sm">
            <div class="font-semibold text-gray-700">
              {{
                article?.user_created?.first_name +
                ' ' +
                article?.user_created?.last_name
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between px-5">
        <div class="font-light text-xs">
          {{ $formatDate(article.date_created) }}
        </div>
        <div v-if="article.category.name != 'PR'" class="text-xs">
          {{ $kFormatter(article.views) }} views
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

function $formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

function $kFormatter(num: number): string {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();
}
function defineProps<T>() {
  throw new Error('Function not implemented.');
}
</script>

<style scoped></style>
