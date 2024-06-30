<template>
  <div>
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      class="h-[40vh] bg-primary flex items-center justify-center object-cover bg-center bg-no-repeat bg-cover"
      :style="{
        backgroundImage: category.thumbnail && `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${useImg(
          category.thumbnail
        )}')`,
      }"
    >
      <div class="w-full px-9">
        <div class="">
          <!-- display link page like Home > categories.name  -->
          <Breadcrumb :links="links"  />
        </div>
        <div class="">
          <h1 class="text-3xl font-bold mb-5 text-white">
            អត្ថបទអំពី {{ category?.name }}
          </h1>
        </div>
      </div>
    </div>
    <section class="category-articles py-10">
      <div class="container mx-auto">

        <div
          v-if="articles.length === 0"
          class="text-center text-gray-600"
        >
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
const route = useRoute();
const categorySlug = ref(route.params.slug);
const articles = ref((await useApi<IResponse<IArticle[]>>(
  `/items/article?limit=8&page=${currentPage}&sort=-date_created&filter[category][slug][_eq]=${route.params.slug}&filter[status]=published&fields=title,date_created,views,thumbnail,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
  { method: 'GET' }
)).data);
const loading = ref(false);
const category = (
  await useApi<IResponse<ICategory[]>>(
    `/items/categories?filter[slug][_eq]=${categorySlug.value}&fields=id,name,description,thumbnail,slug`,
    { method: 'GET' }
  )
).data[0];
const links = ref([{ name: 'Home', link: '/' }]);

// const fetchCategory = async () => {
//   loading.value = true;
//   try {
//     const response = await useApi<IResponse<ICategory[]>>(
//       `/items/categories?filter[slug][_eq]=${categorySlug.value}&fields=id,name,description,thumbnail,slug`,
//       { method: 'GET' }
//     );
//     category.value = response.data[0];
//     // updateBreadcrumbs();
//   } catch (error) {
//     console.error('Failed to fetch category:', error);
//   }
// };

// const updateBreadcrumbs = () => {
//   if (category.value) {
//     links.value = [
//       { name: 'ទំព័រដើម', link: '/' },
//       {
//         name: category.value.name,
//         link: `/categories/${category.value.slug}`,
//       },
//     ];
//   }
// };

onMounted(async () => {
  links.value = [
      { name: 'ទំព័រដើម', link: '/' },
      {
        name: category.name,
        link: `/categories/${category.slug}`,
      },
    ];
});

// use head
useHead(() => {
  return {
    title: `Articles in ${category.name || ''}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `Articles in ${category.name || ''}`,
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
        `/items/article?limit=8&page=${currentPage}&sort=-date_created&filter[category][_eq]=${category.id}&filter[status]=published&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
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
