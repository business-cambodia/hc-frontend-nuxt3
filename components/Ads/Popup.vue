<template>
  <div v-if="showAd && ad && ad !== undefined">
    <div
      class="w-screen h-screen fixed backdrop-blur-sm z-[9999999999] popup flex items-center justify-center mb-20"
    >
      <div
        class="h-auto lg:h-[80vh] w-max mx-4 lg:mx-8 rounded-lg"
        :id="ad ? 'ad_' + ad.slug : ''"
      >
        <a
          :href="ad.link"
          target="_blank"
          @click="$handleAdClick(ad ? ad.slug : '')"
        >
          <img
            format="webp"
            loading="lazy"
            :src="useImg(ad.file)"
            alt=""
            class="h-auto md:h-full rounded-t-lg object-cover bg-center bg-no-repeat bg-cover"
          />
        </a>
        <div
          class="flex justify-end items-center bg-white py-2 px-4 rounded-b-lg"
        >
          <div class="text-black mr-4 text-sm lg:text-base">
            បិទដោយខ្លួនឯងនៅ {{ timer }}
          </div>
          <button
            class="bg-primary text-white px-6 py-1"
            @click="() => handleClosePopup?.()"
          >
            បិទឥឡូវនេះ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAd } from '~~/types/ad';

const { $handleAdSeen }: any = useNuxtApp();

const timer = ref(5);
const showAd = ref(false);
const props = defineProps<{
  ad: IAd | undefined;
}>();

const handleCountDown = () => {
  setInterval(() => {
    if (timer.value === 0) {
      handleClosePopup?.();
      clearInterval();
    } else {
      timer.value = timer.value - 1;
    }
  }, 1000);
};

const handleClosePopup = () => {
  const popup = document.getElementById('popup_' + props.ad?.slug);
  if (popup) {
    popup.remove();
  }
};

onMounted(async () => {
  if (props.ad) {
    // Delay showing the ad for 5 seconds
    setTimeout(() => {
      showAd.value = true;
      handleCountDown();
    }, 5000);
    
    await $handleAdSeen(props?.ad?.slug);
  }
});
</script>

<style>
.popup {
  background: rgba(0, 0, 0, 0.7);
}
</style>
