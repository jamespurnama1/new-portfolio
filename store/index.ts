import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => ({
    slugID: [{}] as Array<{ id: string; slug: string }>,
  }),
})
