<template>
  <!-- create a search page -->
  <section class="gradient-pp vh-100">
    <div class="relative lg:h-[75vh] w-full grid grid-cols-1 lg:grid-cols-2">
      <div class="flex items-center justify-center">
        <div class="pt-28 lg:pt-1">
          <h1
            class="text-white text-xl md:text-3xl font-bold text-center"
            data-aos="fade-down"
          >
            ស្វែងរកអត្ថបទដែលអ្នកចង់អាន
          </h1>
          <div class="mt-4" data-aos="fade-up">
            <form
              @submit.prevent="handleSearch"
              class="px-4 w-full max-w-[730px]"
            >
              <label
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                for="default-search"
                >Search</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  required
                  placeholder="Search"
                  class="block w-full h-0 p-4 py-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="default-search"
                  type="search"
                />
                <button
                  type="submit"
                  class="absolute h-0 flex items-center justify-center w-0 end-2.5 bottom-1/2 translate-y-1/2 p-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="w-4 h-4 absolute"
                  >
                    <path
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke="currentColor"
                    ></path>
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center" data-aos="fade-left">
        <img src="/static/search_assets.png" alt="" class="up-down-animation" />
      </div>
    </div>

    <div class="position-absolute w-100 bottom-0">
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 40"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="moving-waves">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="-1"
            fill="rgba(255,255,255,0.40)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.35)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.25)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="8"
            fill="rgba(255,255,255,0.20)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="13"
            fill="rgba(255,255,255,0.15)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="16"
            fill="rgba(255,255,255,1)"
          />
        </g>
      </svg>
    </div>
  </section>

  <div class="container mt-10 mx-auto mb-5">
    <div v-if="loading" class="text-center text-white">
      <div>
        <div class="flex flex-row gap-2 items-center justify-center">
          <div
            class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"
          ></div>
          <div
            class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"
          ></div>
          <div
            class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-else-if="articles.length === 0 && isSearched"
      class="text-center text-black text-lg"
    >
      <!-- No results found -->
      មិនមានអត្ថបទនេះទេ!
    </div>
    <div
      v-else
      class="mx-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ReusablesArticleCard
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IArticle } from '~/types/article';
import type { IResponse } from '~/types/api';

const searchQuery = ref('');
const isSearched = ref(false);
const articles = ref<IArticle[]>([]);
const loading = ref(false);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;
  loading.value = true;
  try {
    const response = await useApi<IResponse<IArticle[]>>(
      `/items/article?filter[status]=published&filter[title][_contains]=${searchQuery.value}&sort[]=-date_created&fields=title,date_created,slug,image,views,thumbnail,category.name,user_created.first_name,user_created.last_name,user_created.avatar,description`,
      { method: 'GET' }
    );
    articles.value = response.data;
    isSearched.value = true;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Don't forget include bootstrap 5.3.0 */
.gradient-pp {
  background: linear-gradient(45deg, #049900, #07d300);
}

.title {
  color: #fff;
  font-size: 5em;
}

.waves {
  position: relative;
  width: 100%;
  height: 16vh;
  margin-bottom: -30px;
  min-height: 100px;
  max-height: 150px;
}

.waves.no-animation .moving-waves > use {
  animation: none;
}

.wave-rotate {
  transform: rotate(180deg);
}

.moving-waves > use {
  animation: f 40s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.moving-waves > use:first-child {
  animation-delay: -2s;
  animation-duration: 11s;
}

.moving-waves > use:nth-child(2) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.moving-waves > use:nth-child(3) {
  animation-delay: -3s;
  animation-duration: 15s;
}

.moving-waves > use:nth-child(4) {
  animation-delay: -4s;
  animation-duration: 20s;
}

.moving-waves > use:nth-child(5) {
  animation-delay: -4s;
  animation-duration: 25s;
}

.moving-waves > use:nth-child(6) {
  animation-delay: -3s;
  animation-duration: 30s;
}

@keyframes f {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  to {
    transform: translate3d(85px, 0, 0);
  }
}

.up-down-animation {
  animation: upDown 4s infinite;
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
