<template>
  <main class="overflow-hidden ">
    <ul class="slider h-screen">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :style="{ backgroundImage: `url(${item.image})` }"
      >
        <div class="overlay"></div>
        <div class="content">
          <div class="mb-5 tags-box flex justify-between">
            <div class="flex items-center justify-center">
              <span class="tags bg-primary px-2">{{ item.tags }}</span>
            </div>
            <!-- date -->
            <div class="flex items-center justify-center">
              <span class="text-white">{{ item.date }}</span>
            </div>
          </div>
          <h2 class="titletext-white font-bold text-2xl">
            {{ item.title }}
          </h2>
          <!-- <p class="description">{{ item.description }}</p> -->
          <div class="">
            <button @click="readMore(item)">Read More</button>
          </div>
          <!-- div with views and author  -->
          <div class="flex justify-between mt-5" style="padding-top: 15px">
            <div class="flex items-center gap-x-2">
              <ion-icon name="eye-outline" class="text-white"></ion-icon>
              <span class="text-white ml-2">{{ item.view }}</span>
            </div>
            <div class="flex items-center gap-x-2">
              <ion-icon name="person-outline" class="text-white"></ion-icon>
              <span class="text-white ml-2">{{ item.author }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <nav class="nav">
      <ion-icon
        class="btn prev"
        name="arrow-back-outline"
        @click="prevSlide"
      ></ion-icon>
      <ion-icon
        class="btn next"
        name="arrow-forward-outline"
        @click="nextSlide"
      ></ion-icon>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  {
    image:
      'https://healthy-cambodia.com/uploads/blog/News/1ae5097b66cf74b802ec03b444564ed8.jpg',
    title:
      'ស្រីៗគួរផ្អាកញុំាសិនទៅអាហារ៣ប្រភេទនេះ ប្រយ័ត្ន ធ្លាក់ស រមាស់ទ្វារមាសកាន់តែខ្លាំងឡើងមិនបាត់',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    tags: 'សម្រស់',
    view: 100,
    author: 'Soun Soratha',
    date: '01-01-2024',
  },
  {
    image:
      'https://healthy-cambodia.com/uploads/blog/News/9a17773f94ecf254741af1f4abd6c317.png',
    title: 'ចង់ដោះសម្ពាធផ្លូវចិត្ត! លុះត្រាអ្នកធ្វើរឿងនេះ ដើម្បីចិត្តគំនិតខ្លាំងជាងបញ្ហា',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    tags: 'សម្រស់',
    view: 100,
    author: 'Soun Soratha',
    date: '01-01-2024',
  },
  {
    image:
      'https://healthy-cambodia.com/uploads/blog/News/84f4c6ddba061d9ad813723717447316.png',
    title: 'ធ្ងន់ធ្ងរណាស់! Elon Musk ប្រកាសប្រុងធ្វើពហិការ ឈប់ឱ្យបុគ្គលិកប្រើ iPhone ក្រោយ Apple បង្ហាញ AI',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    tags: 'សម្រស់',
    view: 100,
    author: 'Soun Soratha',
    date: '01-01-2024',
  },
  {
    image:
      'https://healthy-cambodia.com/uploads/blog/News/95a35a403bd2481d8a2aec679fc47cf7.png',
    title: 'ចង់ដោះសម្ពាធផ្លូវចិត្ត! លុះត្រាអ្នកធ្វើរឿងនេះ ដើម្បីចិត្តគំនិតខ្លាំងជាងបញ្ហា',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    tags: 'សម្រស់',
    view: 100,
    author: 'Soun Soratha',
    date: '01-01-2024',
  },

]);

const nextSlide = () => {
  items.value.push(items.value.shift());
};

const prevSlide = () => {
  items.value.unshift(items.value.pop());
};

const readMore = (item) => {
  alert(`Read more about ${item.title}`);
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans Khmer', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}

body {
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.tags-box {
  padding: 10px 0 20px 0;
}

.tags {
  padding: 4px 8px;
  font-size: 20px;
  border-radius: 10px;
}

.item {
  width: 200px;
  height: 300px;
  list-style-type: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
}

.item:nth-child(1),
.item:nth-child(2) {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: none;
  border-radius: 0;
  box-shadow: none;
  opacity: 1;
}

.item:nth-child(3) {
  left: 50%;
}

.item:nth-child(4) {
  left: calc(50% + 220px);
}

.item:nth-child(5) {
  left: calc(50% + 440px);
}

.item:nth-child(6) {
  left: calc(50% + 660px);
  opacity: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: inherit;
}

.content {
  width: min(30vw, 500px);
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font: 400 0.85rem helvetica, sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: none;
}

.content .description {
  line-height: 1.7;
  margin: 1rem 0 1.5rem;
  font-size: 0.8rem;
}

.content button {
  width: fit-content;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border: 2px solid rgb(35, 206, 12);
  border-radius: 30px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.content button:hover {
  background-color: rgb(25, 156, 8);
  transition: all 0.3s ease-in-out;
  border: 2px solid white;
}

.item:nth-child(2) .content {
  display: block;
  animation: show 0.75s ease-in-out 0.3s forwards;
}

@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  user-select: none;
}

.nav .btn {
  background-color: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 0, 0, 0.6);
  margin: 0 0.25rem;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
}

.nav .btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

@media (width > 650px) and (width < 900px) {
  .content .title {
    font-size: 1rem;
  }

  .content .description {
    font-size: 0.7rem;
  }

  .content button {
    font-size: 0.7rem;
  }

  .item {
    width: 160px;
    height: 270px;
  }

  .item:nth-child(3) {
    left: 50%;
  }

  .item:nth-child(4) {
    left: calc(50% + 170px);
  }

  .item:nth-child(5) {
    left: calc(50% + 340px);
  }

  .item:nth-child(6) {
    left: calc(50% + 510px);
    opacity: 0;
  }
}

@media (width < 650px) {
  .content .title {
    font-size: 0.9rem;
  }

  .content .description {
    font-size: 0.65rem;
  }

  .content button {
    font-size: 0.7rem;
  }

  .item {
    width: 130px;
    height: 220px;
  }

  .item:nth-child(3) {
    left: 50%;
  }

  .item:nth-child(4) {
    left: calc(50% + 140px);
  }

  .item:nth-child(5) {
    left: calc(50% + 280px);
  }

  .item:nth-child(6) {
    left: calc(50% + 420px);
    opacity: 0;
  }
}
</style>
