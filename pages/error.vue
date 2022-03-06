<template>
  <div>
    <h1 v-if="error.statusCode === 404">?</h1>
    <h1 v-else>!</h1>
    <nuxt-link to="/">
      <button>
        <p>Home</p>
      </button>
    </nuxt-link>
  </div>
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
div {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 3px;
    border: 1px solid var(--color);
    border-radius: 20px 20px;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.5s ease;
    cursor: pointer;
    pointer-events: auto;

    &:hover,
    &:active {
      background-color: var(--color);

      p {
        color: var(--bg);
      }
    }

    p {
      color: var(--color);
      font-size: 1.2em;
      padding: 0.5em;
    }
  }
}
</style>
