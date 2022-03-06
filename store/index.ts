/* eslint-disable camelcase */
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => ({
    windowWidth: 0 as number,
    opened: false as boolean,
    loadHome: 0 as number,
    loadWorks: 0 as number,
    loadWebGL: 0 as number,
    cache: [{}] as Array<{
      title: string
      id: string
      slug: string
      metadata: {
        description: string
        image: {
          imgix_url: string
          url: string
        }
        tools: string[]
        type: string[]
      }
    }>,
  }),
})
