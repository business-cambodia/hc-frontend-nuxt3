<template>
  <!-- <layoutsNavbarWhite /> -->
  <div class="pt-24" id="article_detail">
    <div v-if="articles">
      <ArticlesContent
        :article="articles[0]"
        id="content"
        :firstParagraphAds="firstParagraphAds"
        :sideBarAds="sideBarAds"
        :showElements="showElements"
        :page="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IArticle } from '~/types/article';
import type { IAd } from '~/types/ad';
import type { IResponse } from '~/types/api';
const firstParagraphAds = ref<IAd[]>([]);
const sideBarAds = ref<IAd[]>([]);
const showElements = ref<any>({});

const route = useRoute();
const slug = computed(() => route.params._article);

const article = ref<IArticle | null>(null);

const articles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&filter[slug][_eq]=${route.params._article}`,
        { method: "GET" }
      )
    ))
  ).data
);


</script>

<style scoped>
/*  */
</style>
