/* eslint-disable camelcase */
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => ({
    windowWidth: 0 as number,
    opened: false as boolean,
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
