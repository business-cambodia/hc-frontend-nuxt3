<template>
  <div>
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      class="h-96 bg-primary flex items-center justify-center object-cover bg-center bg-no-repeat bg-cover" :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/category/news.jpg')`,
    }" 
    >
      <div class="w-full">
        <div class="">
          <!-- display link page like Home > categories.name  -->
          <UBreadcrumbs :links="links"  />
        </div>
        <div class="pl-4">
          <h1 class="text-3xl font-bold mb-5 text-white">
            Articles in {{ currentCategory?.name }}
          </h1>
        </div>
      </div>
    </div>
    <section class="category-articles py-10">
      <div class="container mx-auto">
        <div v-if="loading" class="text-center text-gray-600">
          <LoadingSearchArticle />
        </div>
        <div
          v-else-if="articles.length === 0"
          class="text-center text-gray-600"
        >
          No articles found
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ReusablesArticleCard
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
const articles = ref<IArticle[]>([]);
const loading = ref(false);
const currentCategory = ref<ICategory | null>(null);
const links = ref([{ name: 'Home', link: '/' }]);

const fetchCategory = async () => {
  loading.value = true;
  try {
    const response = await useApi<IResponse<ICategory[]>>(
      `/items/categories?filter[slug][_eq]=${categorySlug.value}&fields=id,name,description,thumbnail,slug`,
      { method: 'GET' }
    );
    currentCategory.value = response.data[0];
    updateBreadcrumbs();
  } catch (error) {
    console.error('Failed to fetch category:', error);
  }
};

const fetchCategoryArticles = async () => {
  loading.value = true;
  try {
    if (currentCategory.value) {
      const response = await useApi<IResponse<IArticle[]>>(
        `/items/article?limit=8&=&sort=-date_created&filter[category][_eq]=${currentCategory.value.id}&filter[status]=published&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
        { method: 'GET' }
      );
      articles.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch category articles:', error);
  } finally {
    loading.value = false;
  }
};

const updateBreadcrumbs = () => {
  if (currentCategory.value) {
    links.value = [
      { name: 'ទំព័រដើម', link: '/' },
      {
        name: currentCategory.value.name,
        link: `/categories/${currentCategory.value.slug}`,
      },
    ];
  }
};

watch(categorySlug, async () => {
  await fetchCategory();
  await fetchCategoryArticles();
});

onMounted(async () => {
  await fetchCategory();
  await fetchCategoryArticles();
});

// use head
useHead(() => {
  return {
    title: `Articles in ${currentCategory.value?.name || ''}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `Articles in ${currentCategory.value?.name || ''}`,
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
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    requesting = true;
    currentPage++;
    try {
      const response = await useApi<IResponse<IArticle[]>>(
        `/items/article?limit=8&page=${currentPage}&sort=-date_created&filter[category][_eq]=${currentCategory.value?.id}&filter[status]=published&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
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
  window.addEventListener("scroll", handleScrollPagination);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollPagination);
});

</script>

<style scoped>
.category-articles {
  background-color: #f9f9f9;
}
</style>
