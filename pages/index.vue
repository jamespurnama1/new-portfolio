<template>
  <section>
    <span>
      <h1>james</h1>
      <h1>henry</h1>
    </span>
    <p>{{ result }}</p>
    <!-- <p v-for="obj in getObjects.objects" :key="obj.title">
      {{ obj }}
    </p> -->
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import getObjects from '~/queries/getObjects.gql'

export default defineComponent({
  setup() {
    const { env } = useContext()

    const { result } = useQuery(
      getObjects,
      {
        bucket_slug: env.NUXT_ENV_BUCKET_SLUG,
        read_key: env.NUXT_ENV_READ_KEY,
      },
      {
        prefetch: true,
      }
    )

    onMounted(() => {
      console.log(env)
    })

    return {
      result,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  display: flex;
  padding: 50px;

  span {
    h1 {
      font-size: 100px;
      line-height: 0.8em;

      &:last-child {
        position: relative;
        left: 0.3em;
      }
    }
  }
}
</style>
