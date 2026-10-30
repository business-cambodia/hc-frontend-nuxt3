<!-- pages/article/[slug].vue -->
<template>
  <AdsPopup :ad="popupAds[0]" :id="'popup_' + popupAds[0]?.slug" />
  <!-- damrei popup pc (80%) -->
  <div v-if="!showMSAPopup" id="gax-inpage-async-1706497007"></div>
  <!-- damrei popup mobile (80%) -->
  <div v-if="!showMSAPopup" id="gax-inpage-async-1700710540"></div>

  <!-- Healthy Cambodia - Popup (Zone 137 Mobile, Zone 143 Desktop) - MSA (20%) -->
  <AdsMSAPopup v-if="showMSAPopup" />

  <div class="pt-20 lg:pt-24 bg-gray-100" id="article_detail">
    <ArticleContent
      :aboveArticleAds="aboveArticleAds"
      :article="article"
      id="content"
      :firstParagraphAds="firstParagraphAds"
      :secondParagraphAds="secondParagraphAds"
      :thirdParagraphAds="thirdParagraphAds"
      :sideBarAds="sideBarAds"
      :aboveThumbnailAds="aboveThumbnailAds"
      :latestArticles="latestArticles"
      :relatedArticles="relatedArticles"
      :monthlyArticles="monthlyArticles"
    />
    <!-- Damrei footer -->
    <div id="gax-inpage-async-1700710858"></div>

    <!-- Damrei footer sport -->
    <div id="gax-inpage-async-1718359631"></div>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~~/types/api';
import type { IArticle } from '~~/types/article';
import type { IAd } from '~~/types/ad';
const route = useRoute();



const ads: IAd[] = (
  await (<Promise<IResponse<IAd[]>>>(
    useApi(
      '/items/advertisement?fields=name, slug,link,id , file,advertisement_type.type, advertiser.slug, detail_page&filter[status]=published&filter[detail_page]=true&sort[]=-order',
      {
        method: 'GET',
      }
    )
  ))
).data;

const article = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&filter[slug][_eq]=${route.params.slug}&fields=*,category.name,category.slug,user_created.*,user_created.count(articles)`,
        { method: 'GET' }
      )
    ))
  ).data[0]
);

const latestArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&sort=-date_created&fields=*,category.name,user_created.*&limit=6`,
        { method: 'GET' }
      )
    ))
  ).data
);

const relatedArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&filter[category][name]=${article.value.category.name}&sort=-date_created&fields=*,category.name,user_created.*&limit=6`,
        { method: 'GET' }
      )
    ))
  ).data
);

// to be used in monthly article
const now = new Date();
const firstday = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
const monthlyArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[date_created][_between]=${firstday}, ${now.toISOString()}&limit=6&sort[]=-views&fields=title,date_created,slug,image,thumbnail,category.name,views,user_created.first_name,user_created.last_name,user_created.avatar,description`,
        { method: 'GET' }
      )
    ))
  ).data
);
// const nextArticles = ref(
//   (
//     await (<Promise<IResponse<IArticle[]>>>(
//       useApi(
//         `/items/articles?limit=5&sort=-date_created&filter[status]=published&filter[slug][_neq]=${route.params._article}&filter[user_created][email][_eq]=${articles.value[0].user_created.email}&fields=*,category.name,category.slug,user_created.first_name, user_created.last_name, user_created.avatar`,
//         { method: 'GET' }
//       )
//     ))
//   ).data
// );
// let thumbnail = articles.value[0].thumbnail
//   ? articles.value[0].thumbnail_facebook
//   : articles.value[0].thumbnail;

const damreiAds = [
  'psychology',
  'diseases',
  'food',
  'exercise',
  'news',
].includes(article.value.category.slug);

const showMSAPopup = ref(false);

onMounted(async () => {
  handleArticleViewed(article.value);

  showMSAPopup.value = Math.random() < 0.2;

  (window as any)._ase_region = 'SGP';
  (window as any).gammatag = (window as any).gammatag || {};
  (window as any).gammatag.cmd = (window as any).gammatag.cmd || [];

  await nextTick();

  let adsInitialized = false;

  const initDamrei = () => {
    if (adsInitialized) return;
    const gt = (window as any).gammatag;
    if (!gt || typeof gt.defineZone !== 'function' || typeof gt.sendRequest !== 'function') return;

    adsInitialized = true;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log('[Damrei] Initializing zones for', isMobile ? 'Mobile' : 'Desktop');

    if (isMobile) {
      // Mobile Popup (80% Damrey)
      if (!showMSAPopup.value && document.getElementById('gax-inpage-async-1700710540')) {
        gt.defineZone({ code: 'gax-inpage-async-1700710540', size: [282, 370], params: { siteId: '1700707896', zoneId: '1700710540', zoneType: 'Inpage' } });
      }
      // Mobile Underlay Zone 1
      if (document.getElementById('gax-inpage-async-1700710878')) {
        gt.defineZone({ code: 'gax-inpage-async-1700710878', size: [640, 1386], params: { siteId: '1700707896', zoneId: '1700710878', zoneType: 'Inpage' } });
      }
      // Mobile Underlay Zone 2
      if (document.getElementById('gax-inpage-async-1706848594')) {
        gt.defineZone({ code: 'gax-inpage-async-1706848594', size: [640, 1386], params: { siteId: '1700707896', zoneId: '1706848594', zoneType: 'Inpage' } });
      }
      // MR1 Zone1
      if (document.getElementById('gax-inpage-async-1700710395')) {
        gt.defineZone({ code: 'gax-inpage-async-1700710395', size: [300, 250], params: { siteId: '1700707896', zoneId: '1700710395', zoneType: 'Inpage' } });
      }
      // MR1 Zone2
      if (document.getElementById('gax-inpage-async-1726804113')) {
        gt.defineZone({ code: 'gax-inpage-async-1726804113', size: [300, 250], params: { siteId: '1700707896', zoneId: '1726804113', zoneType: 'Inpage' } });
      }
      // Footer
      if (document.getElementById('gax-inpage-async-1700710858')) {
        gt.defineZone({ code: 'gax-inpage-async-1700710858', size: [720, 250], params: { siteId: '1700707896', zoneId: '1700710858', zoneType: 'Inpage' } });
      }
    } else {
      // Desktop Popup PC (80% Damrey)
      if (!showMSAPopup.value && document.getElementById('gax-inpage-async-1706497007')) {
        gt.defineZone({ code: 'gax-inpage-async-1706497007', size: [1600, 900], params: { siteId: '1706496252', zoneId: '1706497007', zoneType: 'Inpage' } });
      }
      // Underlay Zone 1 (both mobile & desktop)
      if (document.getElementById('gax-inpage-async-1700710878')) {
        gt.defineZone({ code: 'gax-inpage-async-1700710878', size: [640, 1386], params: { siteId: '1700707896', zoneId: '1700710878', zoneType: 'Inpage' } });
      }
      // Underlay Zone 2 (both mobile & desktop)
      if (document.getElementById('gax-inpage-async-1706848594')) {
        gt.defineZone({ code: 'gax-inpage-async-1706848594', size: [640, 1386], params: { siteId: '1700707896', zoneId: '1706848594', zoneType: 'Inpage' } });
      }
      // Desktop MR1 (in Content.vue)
      if (document.getElementById('gax-inpage-async-1709623758')) {
        gt.defineZone({ code: 'gax-inpage-async-1709623758', size: [300, 250], params: { siteId: '1706496252', zoneId: '1709623758', zoneType: 'Inpage' } });
      }
      // Desktop MR1 (in [slug].vue)
      if (document.getElementById('gax-inpage-async-1719845094')) {
        gt.defineZone({ code: 'gax-inpage-async-1719845094', size: [300, 250], params: { siteId: '1706496252', zoneId: '1719845094', zoneType: 'Inpage' } });
      }
      // Footer sport
      if (document.getElementById('gax-inpage-async-1718359631')) {
        gt.defineZone({ code: 'gax-inpage-async-1718359631', size: [720, 250], params: { siteId: '1706496252', zoneId: '1718359631', zoneType: 'Inpage' } });
      }
    }

    console.log('[Damrei] Calling sendRequest()');
    gt.sendRequest();
  };

  if (typeof (window as any).gammatag?.defineZone === 'function') {
    initDamrei();
  } else {
    let script = document.querySelector('script[src*="gaxpt.min.js"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = '//ssp-cdn.gammaplatform.com/js/gaxpt.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => {
      initDamrei();
    });

    const timer = setInterval(() => {
      if (typeof (window as any).gammatag?.defineZone === 'function') {
        clearInterval(timer);
        initDamrei();
      }
    }, 50);
    setTimeout(() => clearInterval(timer), 5000);
  }
});

let thumbnail = article.value.thumbnail;

useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML: `
        var _ase_region="SGP";
        var gammatag = gammatag || {};
        gammatag.cmd = gammatag.cmd || [];
      `,
    },
    {
      src: '//ssp-cdn.gammaplatform.com/js/gaxpt.min.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://www.tiktok.com/embed.js',
      async: true,
    },
  ], 
  title: article.value.title,
  meta: [
    {
      property: 'og:image',
      content: article.value.thumbnail
        ? 'https://healthy-cambodia.com/cms' + '/assets/' + thumbnail
        : article.value.image,
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:url',
      content: 'https://healthy-cambodia.com/article/' + article.value.slug,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: article.value.description.replace(/<[^>]+>/g, ''),
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: article.value.title,
    },
    {
      hid: 'description',
      name: 'description',
      content: article.value.description.replace(/<[^>]+>/g, ''),
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: article.value.slug,
    },
  ],
});

const handleArticleViewed = async (article: IArticle) => {
  await useApi('/article/views/' + article.slug, {
    method: 'GET',
    data: {
      views: article.views + 1,
    },
  });
};

const popupAds: IAd[] = ads.filter((a) => {
  return a.advertisement_type.type == 'popup';
});

const aboveArticleAds = ads.filter((a) => {
  return a.advertisement_type.type === 'above-article';
});

const firstParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type === 'paragraph-1';
});

const secondParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type === 'paragraph-2';
});

const thirdParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type === 'paragraph-3';
});

const sideBarAds = ads.filter((a) => {
  return a.advertisement_type.type === 'sidebar-right';
});

const aboveThumbnailAds = ads.filter((a) => {
  return a.advertisement_type.type === 'above-thumbnail';
});

const bottomAd = ads.filter((a) => {
  return a.advertisement_type.type === 'bottom';
});
</script>

<style scoped></style>
