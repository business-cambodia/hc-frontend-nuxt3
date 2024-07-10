<template>
  <div class="pt-20 lg:pt-24 bg-gray-100" id="article_detail">
    <ArticleContent
      :article="article"
      :latestArticles="latestArticles"
      :relatedArticles="relatedArticles"
      :monthlyArticles="monthlyArticles"
      id="content"
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
const route = useRoute();

const article = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/article?filter[status]=published&filter[slug][_eq]=${route.params.slug}&fields=*,category.name,user_created.*,user_created.count(articles)`,
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
      src: '//ads1.damrei.digital/www/delivery/asyncjs.php',
      async: true,
      defer: true,
    },
    {
      src: '//ads.health.com.kh/www/delivery/asyncjs.php',
      async: true,
      defer: true,
    },
    {
      src: '//gamma.cachefly.net/js/gaxpt.min.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://cdn.innity.net/admanager-async.js',
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
      type: 'text/javascript',
      innerHTML: `
        var innity_adZoneAsync = innity_adZoneAsync || {}; 
        innity_adZoneAsync.q = innity_adZoneAsync.q || []; 
        `,
    },
    // {
    //   type: 'text/javascript',
    //   innerHTML: `
    //     innity_adZoneAsync.q.push(function (){innity_adZoneAsync.display("faefec47428cf9a2f0875ba9c2042a81", "96617", {"target": "div-ad-innity-96617/0"});});
    //     `,
    // },
    // {
    //   type: 'text/javascript',
    //   innerHTML: `
    //     innity_adZoneAsync.q.push(function (){innity_adZoneAsync.display("faefec47428cf9a2f0875ba9c2042a81", "96618", {"target": "div-ad-innity-96618/0"});});
    //     `,
    // },
    {
      type: 'text/javascript',
      innerHTML: `
        var _ase_region="SGP";
        var _ase  = _ase || [];
        var gammatag = gammatag || {};
        gammatag.cmd = gammatag.cmd || [];
        `,
    },
    {
      type: 'text/javascript',
      innerHTML: `
      gammatag.cmd.push(function() {
        // Mobile Underlay 1
        gammatag.defineZone({code:"gax-inpage-async-1700710878",size:[640,1386],params:{siteId:"1700707896",zoneId:"1700710878",zoneType:"Inpage"}});
        
        // Mobile Underlay 2
        gammatag.defineZone({code:"gax-inpage-async-1706848594",size:[640,1386],params:{siteId:"1700707896",zoneId:"1706848594",zoneType:"Inpage"}});
        
        // MR1
        gammatag.defineZone({code:"gax-inpage-async-1700710395",size:[300,250],params:{siteId:"1700707896",zoneId:"1700710395",zoneType:"Inpage"}});

        // Footer
        gammatag.defineZone({code:"gax-inpage-async-1700710858",size:[720,250],params:{siteId:"1700707896",zoneId:"1700710858",zoneType:"Inpage"}});
        gammatag.sendRequest();

        // Footer sport
        gammatag.defineZone({code:"gax-inpage-async-1718359631",size:[720,250],params:{siteId:"1700707896",zoneId:"1718359631",zoneType:"Inpage"}});
      });
      `,
    },
    {
      src: '//ssp-cdn.gammaplatform.com/js/gaxpt.min.js',
      async: true,
    },
  ],
  title: article.value.title,
  meta: [
    {
      property: 'og:image',
      content: article.value.thumbnail
        ? 'https://admin.healthy-cambodia.com' + '/assets/' + thumbnail
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
</script>

<style scoped></style>
