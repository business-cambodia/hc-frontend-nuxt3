<template>
  <div>
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      class="h-[40vh] bg-primary flex items-center justify-center object-cover bg-center bg-no-repeat bg-cover"
    >
      <div class="w-full px-9">
        <div class="text-white py-6 px-3">
          <NuxtLink to="/"> ទំព័រដើម </NuxtLink>
        </div>
        <div class="">
          <h1 class="text-3xl font-bold mb-5 text-white">អត្ថបទពេញនិយមសរុប</h1>
        </div>
      </div>
    </div>
    <section class="category-articles py-10">
      <div class="container mx-auto">
        <div v-if="articles.length === 0" class="text-center text-gray-600">
          No articles found
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5: gap-6"
        >
          <ReusablesArticleCard
            class="mx-6 sm:mx-0"
            data-aos="fade-up"
            data-aos-duration="1500"
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IArticle } from '~/types/article';
import type { IResponse } from '~/types/api';
import type { ICategory } from '~/types/category';

let currentPage = 1;
let requesting = false;

const articles = ref(
  (
    await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[status]=published&sort=-views&fields=title,slug, thumbnail,image, date_created, views, category.name,user_created.*,articles.*&limit=8`,
      { method: 'GET' }
    )
  ).data
);

// use head
useHead(() => {
  return {
    title: `អថ្ថបទពេញនិយម Healthy Cambdodia`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `អថ្ថបទពេញនិយមសរុបនៅទីនេះរបស់ Healthy Cambodia`,
      },
    ],
  };
});
// handleScrollPagination
const handleScrollPagination = async () => {
  if (requesting) return;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop + clientHeight >= scrollHeight - 80) {
    requesting = true;
    currentPage++;
    try {
      const response = await useApi<IResponse<IArticle[]>>(
        `/items/article?filter[status]=published&sort=-views&page=${currentPage}&fields=title,slug, thumbnail,image, date_created, views, category.name,user_created.*,articles.*&limit=4`,
        { method: 'GET' }
      );
      articles.value = [...articles.value, ...response.data];
    } catch (error) {
      console.error('Failed to fetch category articles:', error);
    } finally {
      requesting = false;
    }
  }
};
onMounted(() => {
  window.addEventListener('scroll', handleScrollPagination);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollPagination);
});
</script>
<style scoped>
.category-articles {
  background-color: #f9f9f9;
}
</style>
