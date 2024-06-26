<template>
  <div
    class="author-card md:w-2/4 bg-white p-6 rounded-lg shadow-lg text-center"
  >
    <div class="relative w-full">
      <img
        src="https://tech-cambodia.com/cms/assets/431a6fab-d790-4bb5-8e03-3fc70fed29b0"
        alt="Banner"
        class="w-full h-56 object-cover rounded-t-lg"
      />
      <img
        :src="useImg(author.avatar)"
        alt="Author Avatar"
        class="author-avatar w-44 h-44 rounded-3xl shadow-lg absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 border-4 border-white"
      />
    </div>
    <div class="mt-16">
      <h2 class="text-4xl font-bold">
        {{ author.first_name }} {{ author.last_name }}
      </h2>
      <div class="flex justify-center items-center mt-2">
        <span
          class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-1 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          អត្ថបទសរុប៖ {{ author.points }}
        </span>
      </div>
      <p class="mt-4 text-gray-600">Autor Bio៖ {{ author.bio }}</p>
      <div class="flex justify-center mt-4 space-x-1">
        <NuxtLink
          :to="
            'https://www.facebook.com/sharer/sharer.php?u=https://example.com/authors/' +
            author.id
          "
          target="_blank"
          class="text-blue-600"
        >
          <img src="/static/Facebook.png" alt="Facebook" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink
          :to="
            'https://twitter.com/intent/tweet?url=https://example.com/authors/' +
            author.id
          "
          target="_blank"
          class="text-blue-400"
        >
          <img src="/static/Youtube.png" alt="Twitter" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink
          :to="
            'https://t.me/share/url?url=https://example.com/authors/' +
            author.id
          "
          target="_blank"
          class="text-blue-500"
        >
          <img src="/static/Telegram.png" alt="Telegram" class="w-8 h-8" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAuthor } from '@/types/author';

const props = defineProps<{
  author: IAuthor;
}>();

function useImg(url: string): string {
  return url || 'https://via.placeholder.com/150';
}
</script>

<style scoped>
.author-card {
  position: relative;
}


</style>
