<template>
  <div class="msa-popup-container" style="display: contents;">
    <ins
      v-if="isMounted"
      :data-revive-zoneid="currentZoneId"
      data-revive-id="787804e582d413f05180b1bcf7b4d832"
    ></ins>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const props = withDefaults(
  defineProps<{
    mobileZoneId?: string;
    desktopZoneId?: string;
  }>(),
  {
    mobileZoneId: '137', // Healthy Cambodia - Mobile Pop up
    desktopZoneId: '143', // Healthy Cambodia - Desktop Pop up
  }
);

const isMounted = ref(false);
const isDesktop = ref(false);
let videoObserver: MutationObserver | null = null;

const currentZoneId = computed(() => {
  return isDesktop.value ? props.desktopZoneId : props.mobileZoneId;
});

const REVIVE_ID = '787804e582d413f05180b1bcf7b4d832';

const triggerRevive = () => {
  const w = window as any;
  const revive = w.reviveAsync && w.reviveAsync[REVIVE_ID];

  if (revive && typeof revive.refresh === 'function') {
    try {
      revive.refresh();
      return;
    } catch (e) {
      console.warn('[MSAPopup] reviveAsync refresh error:', e);
    }
  }

  const existingScript = document.querySelector('script[src*="sknteam.com/www/delivery/asyncjs.php"]');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = '//sknteam.com/www/delivery/asyncjs.php';
    script.async = true;
    script.onload = () => {
      const r = (window as any).reviveAsync?.[REVIVE_ID];
      if (r && typeof r.refresh === 'function') {
        try {
          r.refresh();
        } catch (e) {}
      }
    };
    document.head.appendChild(script);
  } else {
    setTimeout(() => {
      const r = (window as any).reviveAsync?.[REVIVE_ID];
      if (r && typeof r.refresh === 'function') {
        try {
          r.refresh();
        } catch (e) {}
      }
    }, 200);
  }
};

const setupVideoAutoplayFix = () => {
  const handleVideo = (vid: HTMLVideoElement) => {
    if (!vid || !vid.src || !vid.src.includes('sknteam.com')) return;

    if (!vid.muted) {
      vid.muted = true;
      vid.setAttribute('muted', '');
    }
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');

    try {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } catch (e) {}
  };

  document.querySelectorAll('video').forEach((v) => handleVideo(v as HTMLVideoElement));

  videoObserver = new MutationObserver(() => {
    document.querySelectorAll('video').forEach((v) => handleVideo(v as HTMLVideoElement));
  });

  videoObserver.observe(document.body, { childList: true, subtree: true });
};

const cleanupLingeringPopups = () => {
  document.querySelectorAll('div[style*="2147483647"]').forEach((el) => {
    if (el.querySelector('video[src*="sknteam.com"]') || el.querySelector('button[aria-label*="advertisement"]')) {
      el.remove();
    }
  });
};

onMounted(() => {
  isDesktop.value = window.innerWidth >= 1024;
  isMounted.value = true;

  const w = window as any;
  w.__MSA_GENERIC_PC_POPUP__ = false;
  w.__MSA_GENERIC_MOBILE_POPUP__ = false;

  setupVideoAutoplayFix();

  nextTick(() => {
    triggerRevive();
  });
});

onUnmounted(() => {
  cleanupLingeringPopups();
  if (videoObserver) {
    videoObserver.disconnect();
    videoObserver = null;
  }
});
</script>
