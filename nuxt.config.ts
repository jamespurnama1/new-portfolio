import path from 'path'
import fs from 'fs'
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  bridge: {
    capi: true,
    typescript: true,
    nitro: false, // If migration to Nitro is complete, set to true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'James Henry | Portfolio',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'viewport-fit=cover, width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
          media: '(prefers-color-scheme: light)',
        },
        {
          name: 'theme-color',
          content: '#000000',
          media: '(prefers-color-scheme: dark)',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'UI/UX Designer & Frontend Developer. Gain traction & make some noise through your online presence.',
        },
        {
          httpEquiv: 'Accept-CH',
          content: 'Width, DPR, Viewport-Width',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      // script: {
      //  src: './js/GSDevTools.min.js',
      // },
    },
  },

  styleResources: {
    scss: '~styles/*.scss',
  },

  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/apollo-composable' },
    { src: '~/plugins/lottie-web', mode: 'client' },
    '~/plugins/font-awesome',
    { src: '~/plugins/splitting', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org
    // '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://github.com/nuxtclub/feathericons
    // '@nuxtclub/feathericons',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxtjs/ngrok',
    '@nuxtjs/apollo',
  ],

  apollo: {
    tokenName: 'nuxt-apollo', // specify token name
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    clientConfigs: {
      default: {
        httpEndpoint: 'https://graphql.cosmicjs.com/v3',
      },
    },
  },

  env: {
    bucket_slug: process.env.BUCKET_SLUG,
    read_key: process.env.READ_KEY,
  },

  // ngrok: {
  //   authtoken: process.env.NGROK_TOKEN,
  //   // auth: 'my-user:my-pwd',
  //   region: 'jp',
  //   addr: '3000',
  //   // proto: 'https',
  //   // subdomain: 'my-subdomain'
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'James Henry Portfolio',
      short_name: 'James Portfolio',
      description:
        '2022 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.',
      lang: 'en',
      background_color: '#000000',
    },
    meta: {
      name: 'James Henry Portfolio',
      description:
        '2022 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.',
      author: 'James Henry',
      theme_color: '#000000',
      ogHost: 'https://jameshenry.site',
      ogImage: '/portrait.jpg',
      twitterCreator: '@jamespurnama1',
      twitterSite: '@jamespurnama1',
      twitterCard: 'summary',
    },
  },

  generate: {
    // choose to suit your project (composition API issue)
    fallback: 'true',
    interval: 2000,
  },

  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
    },
  },

  typescript: {
    typeCheck: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three',
      'gsap',
      'dat.gui',
      '@vue/apollo-composable',
      'Splitting',
    ],
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
      config.module.rules.push({
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      })
    },
  },
})
