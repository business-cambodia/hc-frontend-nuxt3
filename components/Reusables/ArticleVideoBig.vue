<template>
    <NuxtLink :to="`/videos/${video.slug}`">
      <div
        class="filter overflow-hidden pb-5 shadow-lg rounded-2xl transition-all duration-300 flex flex-col justify-between h-auto max-w-full group cursor-pointer text-start bg-white border border-gray-200"
      >
        <div>
          <div class="relative  overflow-hidden bg-no-repeat bg-cover">
            <img
              :src="useImg(video.thumbnail)"
              alt=""
              class="object-cover h-full w-full transition duration-300 ease-in-out"
            />
          </div>
          <div class="p-4">
            <p
              class="hover:text-primary text-xs inline-flex items-center font-normal leading-sm uppercase px-2 py-0.5 text-white bg-green-600 rounded-full"
            >
              {{ video?.category?.name }}
            </p>
            <div
              class="font-bold text-base mt-2 text-gray-800 line-clamp-2 hover:underline cursor-pointer"
            >
              {{ video?.title }}
            </div>
          </div>
        </div>
        <div class="flex items-center p-4">
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <img
              :src="useImg(video?.user_created?.avatar)"
              alt=""
              class="object-cover h-full w-full"
            />
          </div>
          <div class="ml-4">
            <div class="font-semibold text-gray-800">
              {{ video?.user_created?.first_name }}
              {{ video?.user_created?.last_name }}
            </div>
            <div class="flex items-center text-gray-500 text-xs mt-1">
              <div>{{ $formatDate(video.date_created) }}</div>
              <div class="mx-2">•</div>
              <div>{{ $kFormatter(video.views) }} views</div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  import type { IVideo } from '~~/types/video';
  defineProps<{
    video: IVideo;
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
  </script>
  
  <style scoped>
  .bg-cover {
    background-size: cover;
  }
  
  .border-gray-200 {
    border-color: #e5e7eb;
  }
  </style>
  