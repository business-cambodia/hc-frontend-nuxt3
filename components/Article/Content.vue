<template>
  <AdsAboveArticle
    :ads="aboveArticleAds"
    id="type_above-article"
    type="above-article"
  />
  <div class="lg:grid grid-cols-12 lg:mx-16">
    <div class="col-span-8 rounded-xl bg-white shadow-xl px-4">
      <!-- Header -->
      <div class="">
        <div class="my-2">
          <div
            class="border-primary w-max px-3 text-sm py-0.5 border my-2 rounded-lg"
          >
            {{ article.category.name }}
          </div>
          <!-- <AboveTitleAd :ads="aboveTitleAds" /> -->
          <div
            class="text-grey-800 text-xl lg:text-3xl lg:leading-normal font-medium lg:font-bold article-title dark:text-white"
          >
            {{ article.title }}
          </div>
        </div>

        <div
          class="flex flex-row items-start justify-between pt-1 text-xs lg:text-base"
        >
          <div
            class="w-full flex flex-wrsap space-x-3 justify-start items-center text-gray-500 dark:text-white"
          >
            <i class="text-[0.5rem] sm:text-xs fa-solid fa-user"></i>
            <NuxtLink :to="`/authors/${article.user_created.id}`"
              ><div class="transfrom hover:underline">
                {{
                  article.user_created.first_name +
                  ' ' +
                  article.user_created.last_name
                }}
              </div></NuxtLink
            >
            <i class="text-[0.5rem] sm:text-xs fa-solid fa-clock"></i>
            <div>{{ $formatDate(article.date_created) }}</div>
            <div v-if="article.category.name !== 'PR'" class="font-bold">
              <i class="hidden md:blockfa-solid fa-eye"></i>
              {{ $kFormatter(article.views) }} views
            </div>
          </div>
          <a
            :href="`https://www.facebook.com/sharer.php?u=https://healthy-cambodia.com/article/${article.slug}`"
            target="_blank"
            rel="nofollow"
            class="text-xs md:text-sm bg-blue-700 text-white px-3 py-1 rounded-sm flex items-center space-x-2 mr-3"
            onclick="window.open(this.href, 'share-facebook','left=50,top=50,width=600,height=320,toolbar=0'); return false;"
          >
            <i class="fab fa-facebook"></i>
            <div class="hidden md:block">ចែករំលែក</div>
          </a>
        </div>
      </div>

      <!-- Body -->
      <div class="mt-4 pb-10">
        <div class="col-span-2"></div>
        <div class="pt-2 col-span-6">
          <!-- content -->
          <div class="">
            <AdsAboveThumbnailAds
              :ads="aboveThumbnailAds"
              id="above-thumbnail"
            />
            <!-- thumbnail -->
            <img
              :src="
                article?.thumbnail ? useImg(article.thumbnail) : article.image
              "
              alt=""
              class="w-full rounded-xl object-cover bg-no-repeat bg-center lg:block mb-3"
            />
            <!-- Damrei MR1 -->
            <div id="gax-inpage-async-1700710395"></div>
            <!-- article body -->
            <div
              class="lg:text-lg list-disc font-light dark:text-white break-words"
              id="article-body"
            >
              <div>
                <AdsBody :ads="firstParagraphAds" id="paragraph-1" :body="1" />
                <div id="part-1">
                  <div
                    v-html="splitBody().firstPart"
                    class="article_body"
                  ></div>
                  <!--Mobile Underlay - Zone 1-->
                  <div id="gax-inpage-async-1700710878"></div>
                </div>
              </div>
              <div id="part-2">
                <AdsBody :ads="secondParagraphAds" id="paragraph-2" :body="2" />
                <div v-html="splitBody().secondPart" class="article_body"></div>
                <!--Mobile Underlay - Zone 2-->
                <div id="gax-inpage-async-1706848594"></div>
              </div>

              <div id="part-3">
                <AdsBody :ads="thirdParagraphAds" id="paragraph-3" :body="3" />
                <div v-html="splitBody().thirdPart" class="article_body"></div>

                <!-- Zone Tag : Healthy Cambodia Mobile Inpage UT ad-->
                <div id="div-ad-innity-96617/0"></div>
              </div>

              <div id="the-rest">
                <div v-html="splitBody().theRest" class="article_body"></div>

                <!-- Zone Tag : Healthy Cambodia Mobile Overaly UT ad-->
                <div id="div-ad-innity-96618/0"></div>
              </div>
            </div>
          </div>
          <div
            v-if="article.telegram_embed"
            v-html="article.telegram_embed"
          ></div>
          <!--Damrei - MR1 Desktop-->
          <div
            id="gax-inpage-async-1709623758"
            class="flex justify-center"
          ></div>
          <ArticleAuthor :user="article.user_created" />
        </div>
        <div class="col-span-2"></div>
      </div>
      <div class="border-t-2 my-3">
        <div class="bg-primary text-white px-3 w-fit py-1 rounded-lg my-3">
          អត្ថបទទាក់ទង
        </div>
        <div class="grid grid-cols-12 gap-3">
          <ReusablesArticleCard
            class="col-span-12 sm:col-span-6 md:col-span-4 2xl:col-span-3"
            v-for="a in relatedArticles"
            :article="a"
          />
        </div>
      </div>
      <div class="border-t-2 my-3">
        <div class="bg-primary text-white px-3 w-fit py-1 rounded-lg my-3">
          អត្ថបទពេញនិយមប្រចាំខែ
        </div>
        <div class="grid grid-cols-12 gap-3">
          <ReusablesArticleCard
            class="col-span-12 sm:col-span-6 md:col-span-4 2xl:col-span-3"
            v-for="a in monthlyArticles"
            :article="a"
          />
        </div>
      </div>
    </div>
    <div class="col-span-4">
      <div class="ps-4 w-full h-full">
        <div class="bg-primary text-white px-3 w-fit py-1 rounded-lg">
          អត្ថបទថ្មីៗ
        </div>
        <NuxtLink
          class="bg-white w-full h-[15vh] rounded-lg my-3 flex"
          v-for="a in latestArticles"
          :to="'/article/' + a.slug"
        >
          <img
            :src="a?.thumbnail ? useImg(a.thumbnail) : a.image"
            class="w-2/5 h-full rounded-s-md object-cover bg-no-repeat bg-center"
            alt=""
          />
          <div class="flex flex-col justify-between px-2 w-3/5 py-2">
            <div class="text-[0.7rem] flex justify-between">
              <span> #{{ a.category.name }} </span>
              <span>
                {{ $formatDate(a.date_created) }}
              </span>
            </div>
            <div
              class="text-sm w-full line-clamp-2 sm:line-clamp-3 font-medium"
            >
              {{ a.title }}
            </div>
          </div>
        </NuxtLink>
        <div class="sticky top-3">
          <AdsSideBarRight :ads="sideBarAds" id="side-bar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';
import type { IAd } from '~~/types/ad';
import AboveArticle from '../Ads/AboveArticle.vue';
const { $handleAdSeen } = useNuxtApp();

const props = defineProps<{
  aboveArticleAds: Array<IAd>;
  article: IArticle;
  firstParagraphAds: Array<IAd>;
  secondParagraphAds: Array<IAd>;
  thirdParagraphAds: Array<IAd>;
  sideBarAds: Array<IAd>;
  aboveThumbnailAds: Array<IAd>;
  latestArticles: Array<IArticle>;
  relatedArticles: Array<IArticle>;
  monthlyArticles: Array<IArticle>;
}>();

const splitBody = () => {
  const bodyParts = props.article.description.split('\n');
  return {
    firstPart: bodyParts[0],
    secondPart: bodyParts[1] ? bodyParts[1] + '' : '\n',
    thirdPart: bodyParts[2] ? bodyParts[2] + '' : '\n',
    theRest: bodyParts.length > 3 ? bodyParts.slice(3).join('') : '\n',
  };
};

// here where i toggle impression on ads seen
// here where i toggle impression on ads seen
onMounted(() => {
  try {
    let observer = new IntersectionObserver(
      async (entries) => {
        if (entries.length) {
          entries.forEach((e) => {
            // if we scroll to see the ad
            if (
              e.isIntersecting
              // !document.getElementById(e.target.id)?.classList.contains("seen")
            ) {
              $handleAdSeen(e.target.children[0].id);
              // // make it seen and not count impression again next time
              // document.getElementById(e.target.id)?.classList.add("seen");
            }
          });
        }
      },
      { threshold: 0 }
    );

    // observer each ads from each article without props.page

    // --> above article page

    props.aboveArticleAds.forEach((a, index) => {
      observer.observe(document.getElementById('above_ads_' + index)!);
    });

    // --> under article page
    props.aboveThumbnailAds.forEach((a, index) => {
      observer.observe(document.getElementById('above_thumbnail_' + index)!);
    });

    // --> body ads
    props.firstParagraphAds.forEach((a, index) => {
      observer.observe(document.getElementById('body_ads_' + index + '_' + 1)!);
    });
    props.secondParagraphAds.forEach((a, index) => {
      observer.observe(document.getElementById('body_ads_' + index + '_' + 2)!);
    });
    props.thirdParagraphAds.forEach((a, index) => {
      observer.observe(document.getElementById('body_ads_' + index + '_' + 3)!);
    });
    // --> side bar ads
    props.sideBarAds.forEach((a, index) => {
      observer.observe(document.getElementById('side_ads_' + index)!);
    });
  } catch (error) {
    // console.log(error);
  }
});
</script>

<style>
iframe {
  max-width: 100%;
}

.article_body a {
  text-decoration: underline;
  color: blue;
}

.article_body {
  white-space: pre-wrap;
  line-height: 1.75;
}

.article_body,
p,
pre,
span {
  padding: 9px 0px;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
}

.profile-avatar {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 12%;
  text-align: center;
  z-index: 1;
}

#article-body img {
  height: 100%;
  width: 100%;
}

.article_body ul {
  list-style: disc;
  padding-left: 1rem;
  line-height: normal;
}

.article_body ol {
  list-style: decimal;
  padding-left: 1rem;
}

.article_body li {
  line-height: normal;
}

.article_body h1 {
  font-size: 2em;
  font-weight: bold;
  color: #089cf4;
  line-height: normal;
}

.article_body h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: #777777;
  line-height: normal;
}

.article_body h3 {
  font-size: 1.17em;
  font-weight: bold;
}

.article_body ul li {
  line-height: 180%;
}

table {
  max-width: fit-content;
}
</style>
