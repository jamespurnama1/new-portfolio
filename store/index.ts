import type { Post, About } from '~/types/queries'

export const useStore = defineStore('main', {
  state: () => ({
    dark: true as boolean,
    windowWidth: 0 as number,
    opened: false as boolean,
    loadHome: 0 as number,
    loadWorks: 100 as number, // disabled
    loadWebGL: 0 as number,
    loaded: false as boolean,
    posts: [{}] as Post[],
    slugs: [] as string[],
    about: {} as About
  }),
  actions: {
    async fetchPosts() {
      try {
        this.posts = (await fetchSanity('landing')).post as Post[]
        for (let i = 0; i < this.posts.length; i++) {
          this.slugs.push(this.posts[i].slug.current)
        }
        this.loadHome += 10
      } catch (e) {
        console.error(e)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }
    },
    async fetchAbout() {
      try {
        this.about = (await fetchSanity('about')).about as About
        for (let i = 0; i < this.posts.length; i++) {
          this.slugs.push(this.posts[i].slug.current)
        }
        this.loadHome += 10
      } catch (e) {
        console.error(e)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }
    }
  },
})
