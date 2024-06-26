<template>
  <div class="grid grid-cols-1 lg:grid-cols-3">
    <div class="pb-6 col-span-2">
      <div
        id="title"
        class="lg:px-36 text-black my-3 object-cover bg-center bg-no-repeat bg-cover"
      >
        <div class="text-2xl lg:text-4xl font-bold article-title text-center">
          {{ article?.title }}
        </div>
        <div
          class="flex justify-center text-xs lg:text-sm font-light text-gray-500 mt-4 space-x-2"
        >
          <NuxtLink
            :to="'/authors/' + article.user_created.id"
            class="flex items-center space-x-1"
          >
            <img
              :src="useImg(article.user_created.avatar)"
              alt=""
              class="w-6 h-6 rounded-full"
            />
            <span>{{
              article.user_created.first_name +
              ' ' +
              article.user_created.last_name
            }}</span>
          </NuxtLink>
          <span class="mx-2">•</span>
          <span>{{ $kFormatter(article.views) }} views</span>
          <span class="mx-2">•</span>
          <span>{{ $formatDate(article.date_created) }}</span>
          <span class="mx-2">•</span>
          <NuxtLink :to="`/categories/${article.category.slug}`">
            <span>{{ article.category.name }}</span>
          </NuxtLink>
        </div>
        <!-- Share button -->
        <div class="flex justify-center mt-4">
          <button
            @click="showShareModal = true"
            class="flex items-center space-x-2 text-blue-600"
          >
            <img src="/static/Facebook.png" alt="Share" class="w-6 h-6" />
            <span>ចែករំលែកអត្ថបទនេះ</span>
          </button>
        </div>
      </div>
      <!-- body -->
      <div
        class="grid grid-cols-1 lg:grid-cols-left_expand gap-x-6 px-4 lg:px-16 text-lg md:text-xl font-light"
        id="article-body"
      >
        <!-- content -->
        <div>
          <div id="article_thumbnail" class="mb-6">
            <img
              :src="article.image"
              alt="thumb"
              srcset=""
              class="w-full"
            />
          </div>
          <div class="body_content pt-2">
            <div id="part_1_container">
              <div
                v-html="splitBody().firstPart"
                class="article_body"
                id="part-1"
              ></div>
            </div>
          </div>
          <div id="author" class="mt-8">
            <ArticlesAuthor :author="article.user_created" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-red-500"></div>
  </div>
  <!-- Share Modal -->
  <div
    v-if="showShareModal"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg max-w-sm w-full text-center">
      <button
        @click="showShareModal = false"
        class="absolute top-2 right-2 text-gray-600"
      >
        ✕
      </button>
      <h3 class="text-lg font-bold mb-4">Share this article</h3>
      <div class="flex justify-center space-x-4">
        <NuxtLink
          :to="`https://www.facebook.com/sharer/sharer.php?u=https://example.com/articles/${article.slug}`"
          target="_blank"
          class="text-blue-600"
        >
          <img src="/static/Facebook.png" alt="Facebook" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink
          :to="`https://twitter.com/intent/tweet?url=https://example.com/articles/${article.slug}`"
          target="_blank"
          class="text-blue-400"
        >
          <img src="/static/Facebook.png" alt="Twitter" class="w-8 h-8" />
        </NuxtLink>
        <NuxtLink
          :to="`https://t.me/share/url?url=https://example.com/articles/${article.slug}`"
          target="_blank"
          class="text-blue-500"
        >
          <img src="/static/Facebook.png" alt="Telegram" class="w-8 h-8" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IAd } from '~/types/ad';
import type { IArticle } from '~/types/article';

const props = defineProps<{
  aboveArticleAds: Array<IAd>;
  article: IArticle;
  firstParagraphAds: Array<IAd>;
  secondParagraphAds: Array<IAd>;
  thirdParagraphAds: Array<IAd>;
  sideBarAds: Array<IAd>;
  underTitleAds: Array<IAd>;
  showElements: any;
  page: number;
}>();

const showShareModal = ref(false);

const splitBody = () => {
  const bodyParts = props.article.description.split('<img');

  return {
    firstPart: bodyParts[0],
    secondPart: bodyParts[1] ? '<img ' + bodyParts[1] : '',
    thirdPart: bodyParts[2] ? '<img ' + bodyParts[2] : '',
    theRest:
      bodyParts.length > 3 ? '<img ' + bodyParts.slice(3).join('<img ') : '',
  };
};

function useImg(url: string): string {
  return url || 'https://via.placeholder.com/150';
}

function $formatDate(date: string | Date): string {
  if (!date) return ''; // Handle cases where date might be undefined or null
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

function $kFormatter(num: number): string {
  if (isNaN(num)) return '0'; // Handle cases where num might be undefined or not a number
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();
}
</script>

<style>
iframe {
  max-width: 100%;
}
p,
.article_body {
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
}
.article-title {
  line-height: 1.5;
}

.body_content {
  white-space: pre-wrap;
}

.article_body a {
  text-decoration: underline;
  color: #ed1c24;
}

.article_body {
  line-height: 1.75;
  display: inline-block;
}

.article_body ul {
  list-style: disc;
}

.article_body ol {
  list-style: decimal;
}

.article_body h1 {
  font-weight: bold;
}
</style>
