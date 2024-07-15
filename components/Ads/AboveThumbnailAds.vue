<template>
  <div class="w-full pb-2 rounded-md">
    <div v-if="ads.length && ads !== undefined">
      <a
        v-for="(a, n) in ads"
        :key="n"
        :href="a.link"
        :id="'above_thumbnail_' + n "
        target="_blank"
        @click="$handleAdClick(a ? a.slug : '')"
      >
        <img
          :id="a ? a.slug : ''"
          format="webp"
          loading="lazy"
          :src="useImg(a.file)"
          alt=""
          :class="`my-2 w-full rounded-md ${
            a && a.mobile_only ? 'lg:hidden' : ''
          }`"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAd } from "~~/types/ad";

defineProps({
  ads: {
    type: Array<IAd>,
    required: true,
  },
  page: Number,
});
</script>

<style></style>
