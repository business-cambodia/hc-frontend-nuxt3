<template>
  <div
    id="article_author"
    class="bg-white filter drop-shadow-lg px-6 py-4 grid grid-cols-1 lg:grid-cols-left_shrink gap-x-10 w-full items-center"
  >
    <div
      class="flex flex-col lg:flex-row justify-center lg:w-full lg:space-x-12"
    >
      <!-- profile -->
      <NuxtLink
        :to="'/authors/' + user.id"
        class="lg:pr-6 lg:border-r-2 flex flex-col items-center"
      >
        <img
          :src="useImg(user.avatar)"
          alt=""
          class="w-32 h-32 object-cover bg-center bg-no-repeat bg-cover lg:max-h-80 lg:max-w-xs rounded-full"
        />
        <div class="font-bold">
          {{ user.first_name + ' ' + user.last_name }}
        </div>
      </NuxtLink>
      <div class="text-center lg:text-start mt-2 lg:mt-0">
        <div class="font-semibold">អំពីអ្នកនិពន្ធ</div>
        <div class="text-sm">{{ user.description }}</div>
        <div class="flex text-lg items-center justify-center lg:justify-start">
          <a :href="user.facebook_link" target="_blank"
            ><i class="fab fa-facebook mx-2"></i
          ></a>
          <a :href="user.youtube_link" target="_blank"
            ><i class="fab fa-youtube mx-2"></i
          ></a>
          <a :href="user.instagram_link" target="_blank"
            ><i class="fab fa-instagram mx-2"></i
          ></a>
        </div>
        <p class="text-xs">អត្ថបទសរុប៖ {{ user.articles_count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAuthor } from '~/types/author';

defineProps<{
  user: IAuthor;
}>();
</script>

<style></style>
