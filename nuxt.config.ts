import path from 'path'
import fs from 'fs'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'new-portfolio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  styleResources: {
    scss: '~styles/*.scss',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/composition-api', '@/plugins/apollo-composable'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/ngrok',
    '@nuxt/content',
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

  ngrok: {
    authtoken: process.env.NGROK_TOKEN,
    // auth: 'my-user:my-pwd',
    region: 'jp',
    addr: '3000',
    // proto: 'https',
    // subdomain: 'my-subdomain'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  generate: {
    // choose to suit your project (composition API issue)
    fallback: true,
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
    transpile: ['three', 'gsap', 'dat.gui', '@vue/apollo-composable'],
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
}
