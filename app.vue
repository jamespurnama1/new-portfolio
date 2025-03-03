<template>
  <div class="font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/store';

useHead({
  title: 'James Henry | Portfolio',
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content:
        'viewport-fit=cover, width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
      media: '(prefers-color-scheme: light)',
    },
    {
      name: 'theme-color',
      content: '#000000',
      media: '(prefers-color-scheme: dark)',
    },
    {
      hid: 'description',
      name: 'description',
      content:
        'UI/UX Designer & Frontend Developer. Gain traction & make some noise through your online presence.',
    },
    {
      'http-equiv': 'Accept-CH',
      content: 'Width, DPR, Viewport-Width',
    },
    {
      property: 'og:url',
      content: 'https://jameshenry.site'
    },
    {
      property: 'og:title',
      content: 'James Henry Portfolio'
    },
    {
      property: 'og:description',
      content: '2025 Web James Henry Portfolio. Includes branding, packaging, web development, UI/UX, motion design, and so much more.'
    },
    {
      property: 'og:image',
      content: 'https://jameshenry.site/portrait.jpg'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: '@jamespurnama1'
    },
    {
      name: 'twitter:site',
      content: '@jamespurnama1'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ]
})

const store = useStore()
await callOnce(store.fetchPosts)
await callOnce(store.fetchAbout)
</script>
