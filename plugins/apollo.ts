import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://graphql.cosmicjs.com/v3'
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
