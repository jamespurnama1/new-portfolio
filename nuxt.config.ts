import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vesp/nuxt-fontawesome',
    '@nuxt/eslint',
    '@nuxtjs/sanity',
    '@nuxt/image',
  ],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    token: process.env.NUXT_SANITY_TOKEN,
    apiVersion: '2023-09-05',
    useCdn: process.env.NODE_ENV === 'production',
  },
  image: {
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID,
      dataset: process.env.NUXT_SANITY_DATASET,
      useCdn: true,
    },
    domains: ['cdn.sanity.io'],
    quality: 80,
    format: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
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

  postcss: {
    plugins: {},
  },

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

  build: {
    transpile: ['three', 'gsap', 'Splitting'],
  },

  css: ['~/assets/styles/index.css'],

  compatibilityDate: '2025-01-28',
  vite: {
    plugins: [tailwindcss()],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@use "~/assets/styles/index.scss" as *;',
    //     },
    //   },
    // },
  },
})