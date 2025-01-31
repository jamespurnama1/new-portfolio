<template>
  <div>
    <client-only>
      <WebGL>
        <slot />
      </WebGL>
    </client-only>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from '@nuxtjs/composition-api'
// import { useStore } from '~/store'
// import type { Post } from '~/types/queries'

// export default defineComponent({
//   setup() {
// const store = useStore()
// const config = useRuntimeConfig()
// const title = 'portfolio'
// const { $store } = useNuxtApp()

// const { onResult, onError } = useQuery(
//   getId,
//   {
//     bucket_slug: config.public.bucketSlug,
//     read_key: config.public.readKey,
//   },
//   {
//     prefetch: true,
//   }
// )
// const { data, error } = await fetchSanity('landing')
// if (!data.value || error.value) throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
// onResult((queryResult) => {
// store.$patch({
//   post: data.value.post as Post[],
// })
// })

// onError((error) => {
//   console.error(error)
// })

//     return {
//       title,
//     }
//   },
// })
</script>

<style lang="scss">
html {
  font-family: 'Founders Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: var(--color);
  word-spacing: 1px;
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
  height: calc(100vh - env(safe-area-inset-bottom));

  @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }

  /* stylelint-disable-next-line selector-id-pattern */
  #__nuxt {
    height: 100vh;
    -ms-overflow-style: none;

    /* IE and Edge */
    scrollbar-width: none;
  
    /* Firefox */

    &::-webkit-scrollbar {
      display: none;

      /* Hide scrollbar for Chrome, Safari and Opera */
    }
  }

  p {
    font-size: 0.75em;

    @include min-media(mobile) {
      font-size: 2em;
    }

    @include min-media(desktop) {
      font-size: 2em;
    }
  }

  h3 {
    font-size: 2em;

    @include min-media(mobile) {
      font-size: 3em;
    }

    @include min-media(desktop) {
      font-size: 4em;
    }
  }

  h4 {
    @include min-media(mobile) {
      font-size: 2em;
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
