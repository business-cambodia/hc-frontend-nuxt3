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
            src="/assets/logo.png"
            class="w-12 object-cover bg-center bg-no-repeat bg-cover"
            alt="BC Logo"
          />
        </div>
      </NuxtLink>

      <ul
        class="hidden lg:flex list-none text-base sticky top-0 font-light items-center"
      >
        <NuxtLink
          v-for="(c, index) in categories"
          :key="index"
          :to="`/categories/${c.slug}`"
        >
          <li class="mx-4 nav-item">{{ c.name }}</li>
        </NuxtLink>
      </ul>
      <NuxtLink to="/" class="hidden lg:flex">
        <IconsSearch />
      </NuxtLink>
      <div class="lg:hidden flex items-center space-x-3">
        <IconsMenu
          class="cursor-pointer block lg:hidden"
          @click="toggleDrawer"
          v-if="!close"
        />
        <IconsClose class="cursor-pointer" @click="toggleDrawer" v-if="close" />
        <NuxtLink to="/">
          <IconsSearch />
        </NuxtLink>
      </div>
    </div>

    <!-- drawer -->
    <div
      class="h-screen w-screen text-start flex right-0 items-center justify-center backdrop-blur-sm fixed z-30 lg:hidden bg-gray-900 bg-opacity-80 navbar"
      v-if="drawer"
    >
      <ul class="">
        <div @click="toggleDrawer" class="text-center">
          <NuxtLink
            v-for="(c, index) in categories"
            :key="index"
            :to="`/categories/${c.slug}`"
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
import { ref, onMounted } from 'vue';
import { categories } from '@/data/categories';
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

onMounted(() => {
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
