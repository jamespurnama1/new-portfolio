<template>
  <div class="fixed w-screen h-safe-height flex justify-center items-center flex-col">
    <h1 class="text-8xl leading-[0.5em] text-black dark:text-white" v-if="error.statusCode === 404">?</h1>
    <h1 class="text-8xl leading-[0.5em] text-black dark:text-white" v-else>!</h1>
    <NuxtLink to="/">
      <button
        class="m-1 border border-solid border-black dark:border-white rounded-2xl bg-black/0 transition-all duration-500 ease-in-out pointer-events-auto active:bg-white active:dark:bg-black dark:pointer-fine:hover:bg-black pointer-fine:hover:bg-white"
        aria-label="Home">
        <p class="text-black dark:text-white active:text-black dark:active:text-white pointer-fine:text text-xl p-2">Home</p>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['error'])
</script>
