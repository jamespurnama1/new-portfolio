// import path from 'path'
// import fs from 'fs'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // bridge: {
  //   capi: true,
  //   typescript: true,
  //   nitro: false, // If migration to Nitro is complete, set to true
  // },

  // css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    // '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // https://composition-api.nuxtjs.org
    '@nuxtjs/stylelint-module', // https://github.com/nuxt-community/style-resources-module
    // https://pinia.vuejs.org/ssr/nuxt.html
    // change to @vite-pwa/nuxt
    // '@nuxtclub/feathericons',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vesp/nuxt-fontawesome',
    '@nuxt/eslint',
    '@nuxtjs/sanity',
  ],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    token: process.env.NUXT_SANITY_TOKEN,
    apiVersion: '2023-09-05',
    useCdn: process.env.NODE_ENV === 'production',
  },

  // env: {
  //   bucket_slug: process.env.BUCKET_SLUG,
  //   read_key: process.env.READ_KEY,
  // },

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
        '2025 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.',
      lang: 'en',
      background_color: '#000000',
    },
  },

  generate: {
    // choose to suit your project (composition API issue)
    // fallback: 'true',
    // interval: 2000,
  },

  // server: {
  //   host: '0.0.0.0',
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
  //   },
  // },

  typescript: {
    typeCheck: true,
  },

  runtimeConfig: {
    sanity: { token: '' },
    public: {
      readKey: '',
      bucketSlug: '',
    },
  },

  fontawesome: {
    icons: {
      solid: [
        'arrow-up-right-from-square',
        'arrow-down',
        'envelope-open',
        'sun',
        'moon',
        'file',
      ],
      brands: ['instagram', 'behance-square', 'linkedin', 'github'],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three',
      'gsap',
      'Splitting',
    ],
    // extractCSS: true,
    // extend(config, ctx) {
    //   if (ctx.isDev) {
    //     config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
    //   }
    //     test: /\.glsl$/,
    //     loader: 'webpack-glsl-loader',
    //   })
    // },
  },

  compatibilityDate: '2025-01-28',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/index.scss" as *;',
        },
      },
    },
  },
})
