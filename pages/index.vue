<template>
  <div class="overflow-hidden">
    <HomeHero :articles="latestArticles" />
    <HomeCategories
      :articles="popularArticles"
      title="អត្ថបទពេញនិយមសរុប"
      :to="'/popular/'"
    />
    <HomeCategories
      v-for="category in categoriesArticles"
      :articles="category.articles"
      :title="category.name"
      :to="'/categories/' + category.slug"
    />
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/api';
import type { IArticle } from '~/types/article';
import type { ICategory } from '~/types/category';

const latestArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&sort=-date_created&fields=title,slug, thumbnail,image, date_created, views, category.name,user_created.*,articles.*&limit=5`,
        { method: 'GET' }
      )
    ))
  ).data
);

const popularArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&filter[date_created][_gte]=2024-01-01T00:00:00Z&sort=-views&fields=title,slug, thumbnail,image, date_created, views, category.name,user_created.*,articles.*&limit=4`,
        { method: 'GET' }
      )
    ))
  ).data
);

const categoriesArticles: ICategory[] = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      `/items/categories?filter[status]=published&fields=name, description, thumbnail, slug, articles.views,articles.title,articles.thumbnail,articles.image,articles.slug,articles.date_created, articles.category.name, articles.user_created.first_name, articles.user_created.avatar,articles.user_created.last_name&deep[articles][_limit]=4&deep[articles][_sort]=-date_created&deep[articles][_filter][status]=published`,
      { method: 'GET' }
    )
  ))
).data;
</script>

<style scoped></style>
