<template>
  <AdsPopup :ad="popupAds[0]" :id="'popup_' + popupAds[0]?.slug" />
  <div id="gax-inpage-async-1706497007"></div>
  <!-- damrei popup -->
  <div v-if="Math.random() < 0.5" id="gax-inpage-async-1700710540"></div>
  <ins
    v-else-if="randPopUp == 0"
    data-revive-zoneid="519"
    data-revive-id="2d10743d9880200bf17a894cfa35dba0"
  ></ins>
  <ins
    v-else-if="randPopUp == 1"
    data-revive-zoneid="503"
    data-revive-id="2d10743d9880200bf17a894cfa35dba0"
  ></ins>
  <ins
    v-else
    data-revive-zoneid="535"
    data-revive-id="2d10743d9880200bf17a894cfa35dba0"
  ></ins>
  <!-- gpas popup above -->
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

const randPopUp = Math.floor(Math.random() * 3);

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

onMounted(() => {
  handleArticleViewed(article.value);
});

let thumbnail = article.value.thumbnail;

useHead({
  script: [
    {
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
    {
      src: '//adservermsa.gpas.co/www/delivery/asyncjs.php',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://www.tiktok.com/embed.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
    {
      src: '//ssp-cdn.gammaplatform.com/js/gaxpt.min.js',
      async: true,
    },
    {
      type: 'text/javascript',
      innerHTML: `
        var _ase_region="SGP";
        var gammatag = gammatag || {};
        gammatag.cmd = gammatag.cmd || [];`,
    },
    {
      type: 'text/javascript',
      innerHTML: `
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        gammatag.cmd.push(function() {
          // Popup
          gammatag.defineZone({code:"gax-inpage-async-1700710540",size:[282,370],params:{siteId:"1700707896",zoneId:"1700710540",zoneType:"Inpage"}});

          // Mobile Underlay 1
          gammatag.defineZone({code:"gax-inpage-async-1700710878",size:[640,1386],params:{siteId:"1700707896",zoneId:"1700710878",zoneType:"Inpage"}});

          // Mobile Underlay 2
          gammatag.defineZone({code:"gax-inpage-async-1706848594",size:[640,1386],params:{siteId:"1700707896",zoneId:"1706848594",zoneType:"Inpage"}});

          // MR1 Zone1
          gammatag.defineZone({code:"gax-inpage-async-1700710395",size:[300,250],params:{siteId:"1700707896",zoneId:"1700710395",zoneType:"Inpage"}});

          // MR1 Zone2
          gammatag.defineZone({code:"gax-inpage-async-1726804113",size:[300,250],params:{siteId:"1700707896",zoneId:"1726804113",zoneType:"Inpage"}});

          // Footer
          gammatag.defineZone({code:"gax-inpage-async-1700710858",size:[720,250],params:{siteId:"1700707896",zoneId:"1700710858",zoneType:"Inpage"}});
          gammatag.sendRequest();
        });
      } else {
        gammatag.cmd.push(function() {
          gammatag.defineZone({code:"gax-inpage-async-1706497007",size:[1600,900],params:{siteId:"1706496252",zoneId:"1706497007",zoneType:"Inpage"}});
          /* Define more zone(s) here, each zone per line, if you have multiple zones on the same page. */
          gammatag.sendRequest();
        });
      }
      `,
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
