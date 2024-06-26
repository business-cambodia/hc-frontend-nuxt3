<template>
  <div class="h-auto bg-gradient-to-r from-green-600 to-primary">
    <div
      class="container md:pt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <div class="p-8">
        <div
          class="w-[200px] h-[100px] bg-white flex items-center justify-center rounded-lg"
        >
          <img src="/static/logo.png" alt="" class="w-24" />
        </div>
        <div class="text-white mt-4">
          <p class="text-sm font-bold">
            Cambodia most reliable health website aiming to
            help Cambodian people spend less and live more out of life.
          </p>
          <!-- social media link -->
          <div class="pt-4 flex gap-x-1">
            <NuxtLink
              to="https://www.facebook.com/healthycambodia2020"
              target="_blank"
            >
              <img src="/static/Facebook.png" alt="" class="w-8" />
            </NuxtLink>
            <NuxtLink
              to="https://www.youtube.com/@Healthy_2020"
              target="_blank"
            >
              <img src="/static/Youtube.png" alt="" class="w-8" />
            </NuxtLink>
            <NuxtLink
              to="https://www.tiktok.com/@healthycambodia"
              target="_blank"
            >
              <img src="/static/Tiktok.png" alt="" class="w-8" />
            </NuxtLink>
            <NuxtLink to="">
              <img src="/static/Telegram.png" alt="" class="w-8" />
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
              v-for="(c, index) in categories"
              :key="index"
              :to="`/categories/${c.slug}`"
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
        <h1 class="text-center font-bold text-2xl">Contact Us</h1>
        <div class="pt-4">
          <P
            ><i class="fa-solid fa-location-dot"></i> #HH36, St 265, Sangkat
            Teok Laok III, Khan Toul Kork
          </P>
          <p>
            <i class="fa-solid fa-envelope"></i> sam.businesscambodia@gmail.com
          </p>
          <P
            ><i class="fa-solid fa-phone"></i> (+855) 98 850 854 /
            (+855) 17 300 755 / 93 300 755</P
          >
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white px-8 py-3 flex flex-wrap justify-between">
    <h1>©2024 Healthy Cambodia. All Rights Reserved.</h1>
    <NuxtLink to="https://tech-cambodia.com/about" target="_blank">
      <h1 class="">
        Developed by: <span class="hover:underline">Technology Cambodia</span>
      </h1>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { categories } from '@/data/categories';
</script>

<style scoped></style>
