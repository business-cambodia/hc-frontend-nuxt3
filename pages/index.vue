<template>
  <div class="overflow-hidden">
    <HeroCarousels :items="heroArticles" />
    <IndexCategoryArticles
      :articles="popularArticlesMonthly"
      title="អត្ថបទពេញនិយមប្រចាំខែ"
      to="/popular/monthly"
    />
    <VideoCard />
    <IndexCategoryArticlesWeekly
      :articles="weeklyArticles"
      title="អត្ថបទពេញនិយមប្រចាំសប្តាហ៍"
      to="/popular/weekly"
    />
    <IndexCategoryArticlesNews
      :articles="newsarticles"
      title="ពត័មាន"
      to="/categories/news"
    />
    <IndexCategoryArticlesPsychology
      :articles="psychologyarticles"
      title="ចិត្តសាស្ត្រ"
      to="/categories/psychology"
    />
    <!-- <IndexCategoryArticlesFamousPerson
      :articles="famouspeopleArticles"
      title="បុគ្គលឆ្នើម"
      to="/categories/famous-people"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IArticle } from '~/types/article';
import type { IResponse } from '~/types/api';

const popularArticlesMonthly = ref<IArticle[]>([]);
const heroArticles = ref<IArticle[]>([]);
const weeklyArticles = ref<IArticle[]>([]);
const newsarticles = ref<IArticle[]>([]);
const psychologyarticles = ref<IArticle[]>([]);
const todayArticles = ref<IArticle[]>([]);
const famouspeopleArticles = ref<IArticle[]>([]);

const now = new Date();
const firstday = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

const fetchArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[date_created][_between]=${firstday}, ${now.toISOString()}&limit=5&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
      { method: 'GET' }
    );
    popularArticlesMonthly.value = response.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
};

const fetchTodayArticles = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[status]=published&filter[date_created][_between]=${today}T00:00:00.000Z,${today}T23:59:59.999Z&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
      { method: 'GET' }
    );
    todayArticles.value = response.data;
  } catch (error) {
    console.error("Failed to fetch today's articles:", error);
  }
};

const fetchHeroArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      '/items/article?filter[status]=published&limit=4&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description',
      { method: 'GET' }
    );
    heroArticles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch hero articles:', error);
  }
};

const fetchWeeklyArticles = async () => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    const response = await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[status]=published&filter[date_created][_between]=${oneWeekAgo},${now.toISOString()}&limit=4&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
      { method: 'GET' }
    );
    weeklyArticles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch weekly articles:', error);
  }
};

const fetchNewsArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      '/items/article?filter[category]=1&limit=6&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description',
      { method: 'GET' }
    );
    newsarticles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
  }
};

const fetchPsychologyArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      '/items/article?filter[category]=3&limit=4&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description',
      { method: 'GET' }
    );
    psychologyarticles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch psychology articles:', error);
  }
};

const fetchFamousPeopleArticles = async () => {
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      '/items/article?filter[category]=10&limit=4&sort=-date_created&fields=title,date_created,slug,image,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description',
      { method: 'GET' }
    );
    famouspeopleArticles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch famous people articles:', error);
  }
};

onMounted(async () => {
  await fetchHeroArticles();
  await fetchArticles();
  await fetchTodayArticles();
  await fetchWeeklyArticles();
  await fetchNewsArticles();
  await fetchPsychologyArticles();
  await fetchFamousPeopleArticles();
});

useHead({
  title: 'Healthy Cambodia | ទំព័រដើម',
  meta: [
    {
      name: 'description',
      content:
        'Cambodia most reliable health website aiming to help Cambodian people spend less and live more out of life.',
    },
  ],
});
</script>

<style scoped></style>
