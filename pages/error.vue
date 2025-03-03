<template>
  <div class="flex justify-center items-center">
    <h1 v-if="error && error.statusCode === 404">?</h1>
    <h1 v-else>!</h1>
    <NuxtLink to="/">
      <button
        class="mix-blend-difference m-1 flex items-center justify-center border-solid border bg-transparent dark:border-white border-black rounded-2xl dark:text-white text-black dark:hover:text-black hover:text-white dark:hover:bg-white hover:bg-black transition-full duration-500 ease-in-out cursor-pointer pointer-events-auto pt-2 pb-[0.15rem] px-4"
        aria-label="Home">
        <p>Home</p>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const error = useError()
// import { defineComponent } from '@nuxtjs/composition-api'

// export default defineComponent({
//   setup() {
//     return {}
//   },
// })
</script>
