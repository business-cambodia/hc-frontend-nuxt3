<template>
  <div class="h-auto bg-gradient-to-r from-green-600 to-primary">
    <div
      class="container md:pt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <div class="p-8 flex flex-col items-center md:items-start">
        <div
          class="w-[200px] h-[100px] bg-white flex items-center justify-center rounded-lg"
        >
          <img src="/static/logo.png" alt="" class="w-24" />
        </div>
        <div class="text-white mt-4">
          <p class="text-sm font-bold text-center md:text-start">
            Cambodia most reliable health website aiming to help Cambodian
            people spend less and live more out of life.
          </p>
          <!-- social media link -->
          <div class="pt-4 flex justify-center md:justify-start items-center gap-x-3">
            <NuxtLink
              to="https://www.facebook.com/healthycambodia2020"
              target="_blank"
            >
              <svg
                class="w-8"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="https://www.youtube.com/@Healthy_2020"
              target="_blank"
            >
              <svg
                class="w-8"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="https://www.tiktok.com/@healthycambodia"
              target="_blank"
            >
              <svg
                class="w-7"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                />
              </svg>
            </NuxtLink>
            <NuxtLink to="">
              <svg
                class="w-8"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center p-4">
        <div>
          <h1 class="text-center font-bold text-2xl text-white">Categories</h1>
          <ul
            class="grid grid-cols-2 pt-4 gap-y-4 gap-x-8 list-none text-base text-white font-light text-left md:items-center"
          >
            <NuxtLink
              v-for="(c, index) in navItems"
              :key="index"
              :to="c.slug == '' ? '/' : `/categories/${c.slug}`"
            >
              <li
                class="mx-4 duration-300 transition-all hover:scale-105 hover:underline md:text-center"
              >
                {{ c.name }}
              </li>
            </NuxtLink>
          </ul>
        </div>
      </div>
      <div class="text-left text-white p-8">
        <h1 class="text-center font-bold text-2xl">ទំនាក់ទំនងពួកយើង</h1>
        <div class="pt-4">
          <P
            ><i class="fa-solid fa-location-dot"></i> #HH36, St 265, Sangkat
            Teok Laok III, Khan Toul Kork
          </P>
          <p>
            <i class="fa-solid fa-envelope"></i> sam.businesscambodia@gmail.com
          </p>
          <P
            ><i class="fa-solid fa-phone"></i> (+855) 98 850 854 / (+855) 17 300
            755 / 93 300 755</P
          >
        </div>
      </div>
    </div>
  </div>
  <div
    class="bg-white px-8 py-1 flex flex-wrap justify-center md:justify-between text-xs"
  >
    <h1>©2024 Healthy Cambodia. All Rights Reserved.</h1>
    <NuxtLink to="https://tech-cambodia.com/about" target="_blank">
      <h1 class="">
        Developed by: <span class="hover:underline">Technology Cambodia</span>
      </h1>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/api';
import type { ICategory } from '~/types/category';

const navItems: ICategory[] = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      '/items/categories?fields=slug,id,name&sort=id&filter[status]=published',
      { method: 'GET' }
    )
  ))
).data;

const home: ICategory = {
  name: 'ទំព័រដើម',
  slug: '',
  thumbnail: '',
  articles: undefined,
};
navItems.unshift(home);
</script>

<style scoped></style>
