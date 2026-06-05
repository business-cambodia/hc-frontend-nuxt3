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

    <!-- Mobile drawer underlay / backdrop -->
    <Transition name="fade">
      <div
        v-if="drawer"
        class="mobile-underlay"
        @click="toggleDrawer"
      />
    </Transition>

    <!-- Slide-in side drawer -->
    <Transition name="slide">
      <div
        v-if="drawer"
        class="mobile-drawer"
      >
        <!-- Drawer header -->
        <div class="drawer-header">
          <NuxtLink to="/" @click="toggleDrawer">
            <img src="/static/logo.png" class="w-10 object-cover" alt="BC Logo" />
          </NuxtLink>
          <button class="drawer-close-btn" @click="toggleDrawer" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer nav links -->
        <nav class="drawer-nav">
          <NuxtLink
            v-for="(c, index) in navItems"
            :key="index"
            :to="c.slug === '' ? '/' : `/categories/${c.slug}`"
            class="drawer-link"
            active-class="drawer-link--active"
            exact
            @click="toggleDrawer"
          >
            {{ c.name }}
          </NuxtLink>

          <!-- ណាត់ជួបវេជ្ជបណ្ឌិត -->
          <NuxtLink
            to="/doctors"
            class="drawer-link"
            @click="toggleDrawer"
          >
            ណាត់ជួបវេជ្ជបណ្ឌិត
          </NuxtLink>
        </nav>
      </div>
    </Transition>
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
.navbar {
  transition: top 0.7s ease-in-out;
}

/* ── Desktop nav underline hover ──────────────────── */
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
}
.nav-item:hover:before {
  width: 50%;
}

/* ── Mobile underlay backdrop ─────────────────────── */
.mobile-underlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* ── Slide-in drawer ──────────────────────────────── */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 40;
  height: 100dvh;
  width: min(80vw, 320px);
  background: #ffffff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.drawer-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s;
}
.drawer-close-btn:hover {
  background: #e5e7eb;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0;
}

.drawer-link {
  display: block;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.drawer-link:hover {
  background: #f0fdf4;
  border-left-color: #049900;
  color: #049900;
}
.drawer-link--active {
  background: #f0fdf4;
  border-left-color: #049900;
  color: #049900;
  font-weight: 700;
}

/* ── Fade transition (underlay) ───────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Slide transition (drawer panel) ─────────────── */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
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
