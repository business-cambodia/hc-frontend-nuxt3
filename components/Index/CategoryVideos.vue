<template>
  <div v-if="videos !== undefined && videos.length">
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
      <!-- Custom layout for videos -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Featured Video -->
        <div class="lg:col-span-2 grid grid-rows-2 gap-4">
          <div class="row-span-2 ">
            <ReusablesArticleVideoBig  :video="videos[0]" class="featured-video " />
          </div>
        </div>
        <!-- Other Videos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-1">
          <div v-for="(video, index) in videos.slice(1)" :key="index" class="other-video">
            <ReusablesArticleVideo :video="video" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IVideo } from '~~/types/video';

defineProps({
  videos: {
    type: Array<IVideo>,
    required: true,
  },
  title: String,
  to: String,
});
</script>

<style scoped>


.other-video {
  /* Add any specific styles for other videos here */
}
</style>
