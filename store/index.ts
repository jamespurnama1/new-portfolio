/* eslint-disable camelcase */
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => ({
    windowWidth: 0 as number,
    opened: false as boolean,
    loadHome: 0 as number,
    loadWorks: 100 as number, // disabled
    loadWebGL: 0 as number,
    cache: [{}] as Array<{
      title: string
      id: string
      slug: string
      metadata: {
        description: string
        ar_ios: {
          url: string
          imgix_url: string
        }
        ar_android: {
          url: string
          imgix_url: string
        }
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
