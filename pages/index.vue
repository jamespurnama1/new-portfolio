<template>
  <section>
    <span>
      <h1>james</h1>
      <h1>henry</h1>
    </span>
    <!-- <p v-for="obj in getObjects.objects" :key="obj.title">
      {{ obj }}
    </p> -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
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
