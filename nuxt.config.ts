// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Healthy Cambodia',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Cambodia most reliable health website aiming to help Cambodian people spend less and live more out of life.',
        },
        {
          name: 'keywords',
          content:
            'HealthCare Cambodia , healthcare technology , Best foods , Women Health , Men Health , Baby Health, Best Doctor , Hospital Cambodia , Fitness Program , Fitness Program , Adult health, Adult health , Deadly Diseases',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Healthy Cambodia',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Healthy Cambodia',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Cambodia most reliable health website aiming to help Cambodian people spend less and live more out of life.',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/static/logo.png',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@100..900&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [],
    },
  },
  css: ['~/assets/css/index.css', '~/assets/css/main.css', 'aos/dist/aos.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
