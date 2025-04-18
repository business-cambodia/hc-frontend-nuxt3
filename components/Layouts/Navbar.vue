<template>
  <div class="relative">
    <div
      :class="`fixed flex justify-between w-full items-center top-0 px-6 py-4 z-40 navbar ${
        (scrollPosition > 0 && !drawer) || isArticlePage
          ? 'bg-white text-black border-b border-b-gray-300'
          : 'text-white'
      }`"
      id="navbar"
    >
      <NuxtLink to="/">
        <div class="mr-2 flex">
          <img
            src="/static/logo.png"
            class="w-12 object-cover bg-center bg-no-repeat bg-cover"
            alt="BC Logo"
          />
        </div>
      </NuxtLink>

      <ul
        class="hidden lg:flex list-none text-base sticky top-0 font-light items-center"
      >
        <NuxtLink
          v-for="(c, index) in navItems"
          :key="index"
          :to="c.slug == '' ? '/' : `/categories/${c.slug}`"
        >
          <li class="mx-4 nav-item">{{ c.name }}</li>
        </NuxtLink>
        <!-- create nuxt link go to ណាត់ជួបវេជ្ជបណ្ឌិត with dropdown -->
        <li class="mx-4 nav-item relative group">
          <NuxtLink to="/doctors" class="nav-link">
            ណាត់ជួបវេជ្ជបណ្ឌិត
          </NuxtLink>
          <div
            class="hidden absolute z-10 w-72 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 group-hover:block"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[50vh] overflow-y-auto"
            >
              <li v-for="(d, indexdoc) in doctorsCategories" :key="indexdoc">
                <NuxtLink
                  :to="`/doctors/${d.id}`"
                  class="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >{{ d.name }}</NuxtLink
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <NuxtLink to="/search" class="hidden lg:flex">
        <IconsSearch />
      </NuxtLink>
      <div class="lg:hidden flex items-center space-x-3">
        <NuxtLink to="/search">
          <IconsSearch />
        </NuxtLink>
        <IconsClose class="cursor-pointer" @click="toggleDrawer" v-if="close" />
        <IconsMenu
          class="cursor-pointer block lg:hidden"
          @click="toggleDrawer"
          v-if="!close"
        />
      </div>
    </div>

    <!-- drawer -->
    <div
      class="h-screen w-screen text-start flex right-0 items-center justify-center backdrop-blur-sm fixed z-30 lg:hidden bg-gray-900 bg-opacity-80 navbar"
      v-if="drawer"
    >
      <ul class="">
        <div @click="toggleDrawer" class="text-center">
          <!-- create nuxt link go to ណាត់ជួបវេជ្ជបណ្ឌិត with dropdown -->
          <li class="mx-4 relative group">
            <NuxtLink to="/doctors" class="text-white text-xl">
              ណាត់ជួបវេជ្ជបណ្ឌិត
            </NuxtLink>
            <div
              class="hidden absolute z-10 w-72 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 group-hover:block"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[50vh] overflow-y-auto"
              >
                <li v-for="(d, indexdoc) in doctorsCategories" :key="indexdoc">
                  <NuxtLink
                    :to="`/doctors/${d.id}`"
                    class="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >{{ d.name }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </li>
          <NuxtLink
            v-for="(c, index) in navItems"
            :key="index"
            :to="c.slug === '' ? '/' : `/categories/${c.slug}`"
            class="mx-4 text-white list-none nav-menu hover:underline hover:font-semibold text-xl"
            active-class="text-white font-bold text-lg"
            exact
          >
            <li class="text-center">
              {{ c.name }}
            </li>
          </NuxtLink>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/api';
import type { ICategory } from '~/types/category';
import type { IDoctorsCategories } from '~/types/doctors_categories';

// import { categories } from '@/data/categories';
const navItems: ICategory[] = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      '/items/categories?fields=slug,id,name&sort=id&filter[status]=published',
      { method: 'GET' }
    )
  ))
).data;

// fetch data from api  /items/doctors_categories
const doctorsCategories: IDoctorsCategories[] = (
  await (<Promise<IResponse<IDoctorsCategories[]>>>(
    useApi('/items/doctors_categories?sort=sort', { method: 'GET' })
  ))
).data;
const home: ICategory = {
  name: 'ទំព័រដើម',
  slug: '',
  thumbnail: '',
  articles: undefined,
};
navItems.unshift(home);
// Adjust the path as necessary

const scrollPosition = ref(0);
const lastScroll = ref(0);
const drawer = ref(false);
const close = ref(false);
const isArticlePage = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  close.value = !close.value;
  document.body.classList.toggle('open');
  document.body.classList.toggle('overflow-y-hidden');
};

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar: any = document.getElementById('navbar');
  if (scrollPosition.value == 0) {
    navbar.style.top = '0';
  }
  if (scrollPosition.value > 0) {
    if (scrollTop > lastScroll.value) {
      navbar.style.top = '-50%';
    } else {
      navbar.style.top = '0';
    }
  }
  lastScroll.value = scrollTop;
};

onMounted(async () => {
  isArticlePage.value = window.location.pathname.includes('article');

  window.addEventListener('scroll', updateScroll);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      drawer.value = false;
      close.value = false;
      document.body.classList.remove('open');
      document.body.classList.remove('overflow-y-hidden');
    }
  });
});
</script>

<style>
.backdrop-blur-sm {
  backdrop-filter: blur(10px);
}
.navbar {
  transition: top 0.7s ease-in-out;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
.nav-menu {
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}
.open .nav-menu {
  opacity: 1;
  visibility: visible;
}
.nav-menu > li {
  color: #f9f9f9;
  text-decoration: none;
}
.open .nav-menu > li {
  animation: appear 0.3s both;
}
.nav-item {
  position: relative;
}
.nav-item:before {
  content: '';
  width: 0px;
  height: 3px;
  background: #009900;
  position: absolute;
  top: 120%;
  left: 0;
  transition: 0.5s;
  mix-blend-mode: multiply;
}
.nav-item:after {
  content: '';
  width: 0px;
  height: 3px;
  background: gray;
  position: absolute;
  top: 120%;
  right: 0;
  transition: 0.5s;
  mix-blend-mode: multiply;
}
.nav-item:hover:after {
  width: 50%;
  transform: translateX(100);
}
.nav-item:hover:before {
  width: 50%;
  transform: translateX(-100);
}
@keyframes appear {
  0% {
    opacity: 0;
    translate: 0 50px;
  }
  100% {
    opacity: 1;
  }
}
</style>
