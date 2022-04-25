<template>
  <div>
    <NuxtPage/>
    <client-only>
      <WebGL />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { useQuery } from '@vue/apollo-composable'
import { GET_ID } from '@/api/queries'

    const title = 'portfolio'
    const store = useStore()
    const { env } = useContext()

    const { onResult, onError } = useQuery(
      GET_ID,
      {},
      {
        prefetch: true,
      }
    )

    onResult((queryResult) => {
      store.$patch({
        cache: queryResult.data.getObjects.objects,
      })
    })

    onError((error) => {
      console.error(error)
    })
</script>

<style lang="scss">
html {
  font-family: 'Founders Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: var(--color);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  position: fixed;
  background-color: var(--bg);
  overflow: hidden;
}

body {
  position: fixed;
  overflow: hidden;
  background-color: var(--bg);
  overscroll-behavior: none;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }

  #__nuxt {
    height: 100vh;
    // overflow-y: scroll;
  }

  p {
    font-size: 0.75em;

    @include min-media(mobile) {
      font-size: 0.85em;
    }
  }

  h3 {
    font-size: 2em;

    @include min-media(mobile) {
      font-size: 2.5em;
    }
  }

  a {
    color: black;
    text-decoration: none;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
