<template>
  <div class="md:px-16 pt-10 bg-gray-50">
    <div class="px-4 flex justify-between">
      <div>
        <span class="font-bold text-primary text-2xl"
          >|<span class="text-black text-2xl">Latest videos</span></span
        >
      </div>
      <div class="w-16 justify-between flex">
        <span
          class="p-2 rounded-2xl bg-gray-600 text-white transition-all hover:bg-primary duration-200"
          ><i class="fa-solid fa-arrow-left"></i
        ></span>
        <span
          class="p-2 rounded-2xl bg-gray-600 text-white transition-all hover:bg-primary duration-200"
          ><i class="fa-solid fa-arrow-right"></i
        ></span>
      </div>
    </div>
    <div class="px-2 flex flex-wrap">
      <!-- Main Video -->
      <div
        class="video w-full lg:w-2/3 h-[540px] bg-white p-2 shadow-lg rounded-md"
      >
        <div class="relative h-full">
          <iframe
            class="w-full h-full"
            :src="mainVideo.src"
            :title="mainVideo.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <div
            class="title-video absolute bottom-[15%] w-3/4 right-1 rounded-xl p-3 h-auto"
          >
            <h1 class="font-bold text-xl text-center">
              {{ mainVideo.title }}
            </h1>
          </div>
        </div>
      </div>
      <!-- Grid of Smaller Videos -->
      <div class="w-full lg:w-1/3 flex flex-wrap">
        <div
          v-for="(video, index) in remainingVideos"
          :key="index"
          class="video w-1/2 h-[270px] bg-white p-2 shadow-lg rounded-md"
        >
          <div class="relative h-full">
            <iframe
              class="w-full h-full"
              :src="video.src"
              :title="video.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div
              class="title-video absolute bottom-[15%] w-3/4 right-1 rounded-xl p-3 h-auto"
            >
              <h1 class="font-bold text-xl text-center">
                {{ video.title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videos = ref([
  {
    src: 'https://www.youtube.com/embed/_66foo0w9dU',
    title: 'ចង់ថែមខូឡាជែនឱ្យស្បែកកាន់តែស្រស់ ញុំាផ្លែឈើ៤មុខនេះទៅ/Be Healthy',
  },
  {
    src: 'https://www.youtube.com/embed/_66foo0w9dU',
    title: 'ចង់ថែមខូឡាជែនឱ្យស្បែកកាន់តែស្រស់ ញុំាផ្លែឈើ៤មុខនេះទៅ/Be Healthy',
  },
  {
    src: 'https://www.youtube.com/embed/_66foo0w9dU',
    title: 'ចង់ថែមខូឡាជែនឱ្យស្បែកកាន់តែស្រស់ ញុំាផ្លែឈើ៤មុខនេះទៅ/Be Healthy',
  },
  {
    src: 'https://www.youtube.com/embed/_66foo0w9dU',
    title: 'ចង់ថែមខូឡាជែនឱ្យស្បែកកាន់តែស្រស់ ញុំាផ្លែឈើ៤មុខនេះទៅ/Be Healthy',
  },
  {
    src: 'https://www.youtube.com/embed/_66foo0w9dU',
    title: 'ចង់ថែមខូឡាជែនឱ្យស្បែកកាន់តែស្រស់ ញុំាផ្លែឈើ៤មុខនេះទៅ/Be Healthy',
  },
]);

const mainVideo = computed(() => videos.value[0]);
const remainingVideos = computed(() => videos.value.slice(1));
</script>

<style scoped>
.title-video {
  display: none;
  background-color: rgb(255, 255, 255);
  transition: all 0.5s;
}

.video:hover .title-video {
  display: block;
  transition: all 0.5s;
}
</style>
