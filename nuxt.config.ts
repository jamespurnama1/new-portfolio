import { defineNuxtConfig } from 'nuxt'
import path from 'path'
import fs from 'fs'

export default defineNuxtConfig({
  target: 'static',

  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/styles/index.scss"',
            },
        },
    },
  },

  // styleResources: {
  //   scss: '~styles/*.scss',
  // },

  buildModules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    private: {}, // variables that can only be accessed on server-side
    public: {
      BUCKET_SLUG: process.env.BUCKET_SLUG,
      READ_KEY: process.env.READ_KEY
    }
  },

  // pwa: {
  //   manifest: {
  //     name: 'James Henry Portfolio',
  //     short_name: 'James Portfolio',
  //     description:
  //       '2022 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.',
  //     lang: 'en',
  //     background_color: '#000000',
  //   },
  //   meta: {
  //     name: 'James Henry Portfolio',
  //     description:
  //       '2022 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.',
  //     author: 'James Henry',
  //     theme_color: '#000000',
  //     ogHost: 'https://jameshenry.site',
  //     ogImage: '/portrait.jpg',
  //     twitterCreator: '@jamespurnama1',
  //     twitterSite: '@jamespurnama1',
  //     twitterCard: 'summary',
  //   },
  // },

  typescript: {
    shim: false
  },

  server: {
    // host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
    },
  },

//   extendWebpackConfig({

//   })

//   // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['three', 'gsap', '@apollo/client',  'ts-invariant/process', 'Splitting'],
//     // extractCSS: true,
//     extend(config, ctx) {
//       // if (ctx.isDev) {
//       //   config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
//       // }
//       config.module.rules.push({
//         test: /\.glsl$/,
//         loader: 'webpack-glsl-loader',
//       })
//     },
  },
})
