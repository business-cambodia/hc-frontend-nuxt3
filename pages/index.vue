<template>
  <div class=" ">
    <HeroCarousel
      :items="items"
      :nextSlide="nextSlide"
      :prevSlide="prevSlide"
      :readMore="readMore"
    />
    <IndexCategoryArticles
      :articles="popularArticlesMonthly"
      title="អត្ថបទពេញនិយមប្រចាំខែ"
      to="/popular/monthly"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mockArticles, mockCarouselItems, popularArticlesMonthly as popularArticlesMonthly } from '~/data/mock-data';

const articles = ref(mockArticles);
const items = ref(mockCarouselItems);

const nextSlide = () => {
  // Logic for next slide
};

const prevSlide = () => {
  // Logic for previous slide
};

const readMore = (id: number) => {
  // Logic for read more
};
</script>

<style scoped></style>
