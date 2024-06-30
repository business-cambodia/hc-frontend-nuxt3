// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@100..900&display=swap&family=Noto+Serif+Khmer:wght@100..900&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
        },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-51KL6RCRTC",
          async: true,
        },
        {
          hid: 'gtmHead',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-51KL6RCRTC');
          `,
        },
        {
          type: 'text/javascript',
          body: true,
          innerHTML: `
            /* The region will be automatically detected if "GLOBAL" is set. */
            /* Possible values: "SGP", "JPN", "US_WEST", "EU" */
            var _ase_region="SGP";
            var _ase  = _ase || [];
            /* load placement for account: Business Cambodia, site: healthy-cambodia.com, zone size : 640x1386 */
            _ase.push(['1700707896','1700710878']);
          `,
        },
        {
          type: 'text/javascript',
          body: true,
          src: '//ssp-cdn.gammaplatform.com/js/ad-exchange.js',
        },
        {
          src: 'https://kit.fontawesome.com/7c7b227626.js',
        },
      ],
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
