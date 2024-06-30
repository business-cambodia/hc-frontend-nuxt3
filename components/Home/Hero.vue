<template>
  <div class="carousel">
    <!-- list item -->

    <div class="list">
      <div v-for="(item, index) in articles" :key="index" class="item">
        <img
          :src="item.thumbnail ? useImg(item.thumbnail) : item.image"
          class="relative"
        />

        <div class="content">
          <div
            class="w-[200px] cat-date md:w-[600px] mb-5 flex justify-between items-center text-sm"
          >
            <span class="px-2 py-1 h-fit md:p-2 bg-primary rounded-2xl">
              {{ item.category.name }}</span
            >

            <span class="p-2 rounded-2xl text-gray-300">
              {{ $formatDate(item.date_created) }}
            </span>
          </div>

          <div
            class="title text-xl md:text-2xl lg:text-4xl line-clamp-2 lg:leading-relaxed"
          >
            {{ item.title }}
          </div>

          <div class="w-[300px] aut-views md:w-[600px] mb-5 flex space-x-6">
            <div class="gap-x-3 flex items-center justify-center">
              <i class="fa-solid fa-user text-lg"></i>

              <span class="p-2 rounded-2xl text-sm md:text-lg">
                {{
                  item.user_created.first_name +
                  ' ' +
                  item.user_created.last_name
                }}</span
              >
            </div>

            <!-- If view count available, display view count -->

            <div class="flex items-center text-sm md:text-lg justify-center">
              <i class="fa-solid fa-eye"></i>

              <span class="p-2 rounded-2xl">
                {{ $kFormatter(item.views) }}
              </span>
            </div>
          </div>

          <div class="buttons">
            <NuxtLink :to="`/article/${item.slug}`">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                បន្តការអាន
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- list thumbnail -->

    <div class="thumbnail left-[5%] md:left-[47%]">
      <NuxtLink :to="'/article/'+item.slug" v-for="(item, index) in articles" :key="index" class="item">
        <img :src="item.thumbnail ? useImg(item.thumbnail) : item.image" />
        <div
          class="content text-gray-900 p-1 rounded-xl max-md:hidden"
          style="background-color: rgba(255, 255, 255, 0.8)"
        >
          <div class="title line-clamp-2">{{ item.title }}</div>
        </div>
      </NuxtLink>
    </div>
    <!-- next prev -->

    <div class="arrows">
      <button id="prev" @click="showSlider('prev')">
        <i class="fa-solid fa-circle-chevron-left text-2xl"></i>
      </button>

      <button id="next" @click="showSlider('next')">
        <i class="fa-solid fa-circle-chevron-right text-2xl"></i>
      </button>
    </div>

    <!-- time running -->

    <div class="time"></div>
    <!-- <div class="t bg-primary h-3 absolute top-0 z-[99999999] w-full"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';

const props = defineProps({
  articles: {
    type: Array<IArticle>,
    required: true,
  },
});



const timeRunning = 4500;

const timeAutoNext = 5000;

let runTimeOut: ReturnType<typeof setTimeout>;

let runNextAuto: ReturnType<typeof setTimeout>;

const showSlider = (type: 'next' | 'prev') => {
  const carouselDom = document.querySelector('.carousel')!;

  const SliderDom = carouselDom.querySelector('.list')!;

  const SliderItemsDom = SliderDom.querySelectorAll('.item');

  const thumbnailBorderDom = document.querySelector('.thumbnail')!;

  const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

  if (type === 'next') {
    SliderDom.appendChild(SliderItemsDom[0]);

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    carouselDom.classList.add('next');
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);

    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);

    carouselDom.classList.add('prev');
  }

  clearTimeout(runTimeOut);

  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove('next');

    carouselDom.classList.remove('prev');
  }, timeRunning);

  clearTimeout(runNextAuto);

  runNextAuto = setTimeout(() => {
    (document.getElementById('next') as HTMLElement).click();
  }, timeAutoNext);
};

onMounted(() => {
  runNextAuto = setTimeout(() => {
    (document.getElementById('next') as HTMLElement).click();
  }, timeAutoNext);
});
</script>

<style scoped>
a {
  text-decoration: none;
}

/* carousel */

.carousel {
  height: 100vh;

  /* margin-top: -50px; */

  width: 100vw;

  overflow: hidden;

  position: relative;
}

.carousel .list .item {
  width: 100%;

  height: 100%;

  position: absolute;

  inset: 0 0 0 0;
}

.carousel .list .item img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}

.carousel .list .item .content {
  position: absolute;

  top: 0;

  padding-top: 10%;

  padding-left: 20%;

  width: 100%;

  left: 50%;

  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);

  transform: translateX(-50%);

  padding-right: 30%;

  box-sizing: border-box;

  color: #fff;

  text-shadow: 0 5px 10px #0004;
}

.carousel .list .item .author {
  font-weight: bold;

  letter-spacing: 10px;
}

.carousel .list .item,
.carousel .list .item .topic {
  font-size: 2.5em;

  font-weight: bold;

  line-height: 1.3em;
}

.carousel .list .item .topic {
  color: #f1683a;
}

/* .carousel .list .item .buttons {

  display: grid;

  grid-template-columns: repeat(2, 130px);

  grid-template-rows: 40px;

  gap: 5px;

  margin-top: 20px;

} */

.carousel .list .item .buttons {
  margin-top: 20px;
}

.carousel .list .item .buttons button {
  border: none;

  background-color: #eee;

  font-weight: 500;
}

.carousel .list .item .buttons button:nth-child(2) {
  background-color: transparent;

  border: 1px solid #fff;

  color: #eee;
}

/* thumbail */

.thumbnail {
  position: absolute;

  bottom: 5vh;

  width: max-content;

  z-index: 10;

  display: flex;

  gap: 20px;
}

.thumbnail .item {
  width: 25vw;

  height: 15vw;

  flex-shrink: 0;

  position: relative;
}

.thumbnail .item img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  border-radius: 20px;
}

.thumbnail .item .content {
  position: absolute;

  bottom: 10px;

  left: 10px;

  right: 10px;
}

.thumbnail .item .content .title {
  font-weight: 500;
}

.thumbnail .item .content .description {
  font-weight: 300;
}

.item:first-child {
  position: absolute;
  z-index: 0;
}

/* arrows */

.arrows {
  top: 80%;

  right: 52%;

  z-index: 10;

  width: 300px;

  max-width: 30%;

  display: hidden;

  gap: 10px;

  align-items: center;
}

.arrows button {
  width: 40px;

  height: 40px;

  border-radius: 50%;

  background-color: #eee4;

  border: none;

  color: #fff;

  font-weight: bold;

  transition: 0.5s;
}

.arrows button:hover {
  background-color: #fff;

  color: #000;
}

/* animation */

.carousel .list .item:nth-child(1) {
  z-index: 1;
}

/* animation text in first item */

.carousel .list .item:nth-child(1) .content .cat-date,
.carousel .list .item:nth-child(1) .content .author,
.carousel .list .item:nth-child(1) .content .title,
.carousel .list .item:nth-child(1) .content .topic,
.carousel .list .item:nth-child(1) .content .des,
.carousel .list .item:nth-child(1) .content .aut-views,
.carousel .list .item:nth-child(1) .content .buttons {
  transform: translateY(50px);

  filter: blur(20px);

  opacity: 0;

  animation: showContent 0.5s 1s linear 1 forwards;
}

@keyframes showContent {
  to {
    transform: translateY(0px);

    filter: blur(0px);

    opacity: 1;
  }
}

.carousel .list .item:nth-child(1) .content .title {
  animation-delay: 0s !important;
}

.carousel .list .item:nth-child(1) .content .topic {
  animation-delay: 1.4s !important;
}

.carousel .list .item:nth-child(1) .content .des {
  animation-delay: 1.6s !important;
}

.carousel .list .item:nth-child(1) .content .buttons {
  animation-delay: 1.8s !important;
}

/* create animation when next click */

.carousel.next .list .item:nth-child(1) img {
  width: 150px;

  height: 220px;

  position: absolute;

  bottom: 50px;

  left: 50%;

  border-radius: 30px;

  animation: showImage 0.5s linear 1 forwards;
}

@keyframes showImage {
  to {
    bottom: 0;

    left: 0;

    width: 100%;

    height: 100%;

    border-radius: 0;
  }
}

.carousel.next .thumbnail .item:nth-last-child(1) {
  overflow: hidden;

  animation: showThumbnail 0.5s linear 1 forwards;
}

.carousel.prev .list .item img {
  z-index: 100;
}

@keyframes showThumbnail {
  from {
    width: 0;

    opacity: 0;
  }
}

.carousel.next .thumbnail {
  animation: effectNext 0.5s linear 1 forwards;
}

@keyframes effectNext {
  from {
    transform: translateX(150px);
  }
}

/* running time */

.carousel .time {
  position: absolute;

  z-index: 100000;

  width: 0%;

  height: 3px;

  background-color: #08e713;

  left: 0;

  top: 0;
}

.carousel.next .time,
.carousel.prev .time {
  animation: runningTime 4.5s linear 1 forwards;
}

@keyframes runningTime {
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
}

/* prev click */

.carousel.prev .list .item:nth-child(2) {
  z-index: 2;
}

.carousel.prev .list .item:nth-child(2) img {
  animation: outFrame 0.5s linear 1 forwards;

  position: absolute;

  bottom: 0;

  left: 0;
}

@keyframes outFrame {
  to {
    width: 150px;

    height: 220px;

    bottom: 50px;

    left: 50%;

    border-radius: 20px;
  }
}

.carousel.prev .thumbnail .item:nth-child(1) {
  overflow: hidden;

  opacity: 0;

  animation: showThumbnail 0.5s linear 1 forwards;
}

.carousel.next .arrows button,
.carousel.prev .arrows button {
  pointer-events: none;
}

.carousel.prev .list .item:nth-child(2) .content .author,
.carousel.prev .list .item:nth-child(2) .content .title,
.carousel.prev .list .item:nth-child(2) .content .topic,
.carousel.prev .list .item:nth-child(2) .content .des,
.carousel.prev .list .item:nth-child(2) .content .buttons {
  animation: contentOut 1.5s linear 1 forwards !important;
}

@keyframes contentOut {
  to {
    transform: translateY(-150px);

    filter: blur(20px);

    opacity: 0;
  }
}

@media screen and (max-width: 1024px) {
  .carousel .list .item .content {
    padding-top: 35%;

    padding-left: 10%;

    padding-right: 10%;

    font-size: 0.8em;
  }

  .carousel .list .item,
  .carousel .list .item .topic {
    font-size: 3em;
  }
}

@media screen and (max-width: 768px) {
  .carousel .list .item .content {
    padding-top: 50%;

    padding-left: 5%;

    padding-right: 5%;

    font-size: 1em;
  }

  .carousel .list .item,
  .carousel .list .item .topic {
    font-size: 2em;
  }

  .thumbnail .item {
    width: 200px;

    height: 220px;

    flex-shrink: 0;

    position: relative;
  }
}

@media screen and (max-width: 480px) {
  .carousel .list .item .content {
    padding-top: 25%;

    padding-left: 3%;

    padding-right: 3%;

    font-size: 0.6em;
  }

  .carousel .list .item,
  .carousel .list .item .topic {
    font-size: 1.5em;
  }

  .thumbnail .item {
    width: 45vw;

    height: 20vh;
  }

  .carousel .list .item .content {
    padding-top: 60%;

    padding-left: 5%;

    font-size: 1.5em;

    text-shadow: 0 5px 10px #0004;
  }

  .arrows {
    top: 65%;

    left: 5%;
  }
}
</style>
