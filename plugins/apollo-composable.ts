// import { Context } from '@nuxt/types'
import { defineNuxtPlugin } from '#app'
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
// import { provide, onGlobalSetup } from '@nuxtjs/composition-api'
// import { DefaultApolloClient } from '@vue/apollo-composable/dist'
// import type { Plugin } from '@nuxt/types'
import type { NuxtApp } from '@nuxt/types/app'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const apolloClient = nuxtApp.$apolloProvider?.defaultClient
  // onGlobalSetup(() => {
  if (apolloClient) {
    nuxtApp.hook('vue:setup', () => {
      provide(DefaultApolloClient, nuxtApp.$apolloProvider?.defaultClient)
    })
  }
})
