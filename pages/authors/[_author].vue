<template>
  <div>
    <div
      :style="{
        background: `linear-gradient(rgba(0,0,0,0.5), rgb(0,0,0,0.5)), url(${
          author?.cover_pic ? useImg(author.cover_pic) : '/author_cover.png'
        }) no-repeat center / cover`,
      }"
      class="h-60 lg:h-[40rem] relative"
    >
      <!-- profile picture and author details (name, description, social medias) -->
      <div
        class="h-full flex items-end lg:items-center lg:px-16 justify-center lg:justify-start pb-2 lg:mb-0"
      >
        <!-- profile -->
        <img
          :src="useImg(author.avatar)"
          class="rounded-3xl border-white shadow-md shadow-primary bg-cover object-cover h-36 w-36 lg:h-64 lg:w-64 lg:mr-20"
          alt="profile "
        />
        <!-- details -->
        <div class="text-white hidden lg:block" v-if="author">
          <div class="text-4xl font-bold">
            {{ `${author.first_name} ${author.last_name}` }}
          </div>
          <div class="text-2xl font-light py-2">
            {{ author.description }}
          </div>
          <div class="flex text-xl text-gray-100">
            <a :href="author.facebook_link" target="_blank"
              ><i class="fab fa-facebook mx-2"></i
            ></a>
            <a :href="author.youtube_link" target="_blank"
              ><i class="fab fa-youtube mx-2"></i
            ></a>
            <a :href="author.instagram_link" target="_blank"
              ><i class="fab fa-instagram mx-2"></i
            ></a>
          </div>
          <span
            class="bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-4 text-xl py-1 rounded-full"
            >អត្ថបទសរុប៖ {{ author.articles_count }}</span
          >
        </div>
      </div>
    </div>
    <!-- author details for mobile -->
    <div
      class="lg:hidden bg-white py-4 px-6 filter drop-shadow-xl dark:bg-dark dark:text-white"
      v-if="author"
    >
      <div class="text-xl font-bold text-center">
        {{ `${author.first_name} ${author.last_name}` }}
      </div>
      <div class="text-sm font-light py-2 text-center">
        {{ author.description }}
      </div>
      <div class="flex justify-center text-xl text-gray-800 dark:text-white">
        <a :href="author.facebook_link" target="_blank"
          ><i class="fab fa-facebook mx-2"></i
        ></a>
        <a :href="author.youtube_link" target="_blank"
          ><i class="fab fa-youtube mx-2"></i
        ></a>
        <a :href="author.instagram_link" target="_blank"
          ><i class="fab fa-instagram mx-2"></i
        ></a>
      </div>

      <p class="text-center text-sm font-light mt-2">
        <span
          class="text-center bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-4 text-sm py-1 rounded-full"
          >អត្ថបទសរុប៖ {{ author.articles_count }}</span
        >
      </p>
    </div>
    <!-- author articles -->
    <div class="pt-10">
      <div
        class="font-bold text-2xl flex justify-center text-primary dark:text-white"
      >
        អត្ថបទដោយអ្នកនិពន្ធរូបនេះ
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center gap-x-4 gap-y-8 mt-8 lg:px-20"
      >
        <div
          data-aos="zoom-in-up"
          v-for="(a, n) in authorArticles"
          :key="n"
          class="flex justify-center"
        >
          <ReusablesArticleCard :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IResponse } from '~~/types/api';
import type { IArticle } from '~~/types/article';
import type { IAuthor } from '~~/types/author';
import { useImg } from '../../composables/useImg';

const route = useRoute();
const currentPage = ref(1);
const requesting = ref(false);

const author = (await useApi<IResponse<IAuthor>>(
  `/users/${route.params._author}?fields=*,count(article)`,
  { method: 'GET' }
)).data;
const authorArticles = ref<IArticle[]>([]);

const fetchAuthor = async () => {
  try {
    const response = await useApi<IResponse<IAuthor>>(
      `/users/${route.params._author}?fields=*,count(article)`,
      { method: 'GET' }
    );
    author.value = response.data;
  } catch (error) {
    console.error('Failed to fetch author:', error);
  }
};

const fetchAuthorArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[user_created][_eq]=${author.value?.id}&filter[status][_eq]=published&limit=10&page=${currentPage.value}&fields=title,user_created.id,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.count(article),user_created.avatar,description,category.name&sort=-date_created`,
      { method: 'GET' }
    );
    authorArticles.value = [...authorArticles.value, ...response.data];
  } catch (error) {
    console.error('Failed to fetch author articles:', error);
  } finally {
    requesting.value = false;
  }
};

const handleScrollPagination = async () => {
  const documentHeight = document.body.scrollHeight;
  const currentScroll = window.scrollY + window.innerHeight;
  if (currentScroll > 0.8 * documentHeight && !requesting.value) {
    requesting.value = true;
    currentPage.value += 1;
    await fetchAuthorArticles();
  }
};

onMounted(async () => {
  await fetchAuthor();
  await fetchAuthorArticles();
  window.addEventListener('scroll', handleScrollPagination);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollPagination);
});


</script>

<style scoped>
.profile {
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
}
</style>
