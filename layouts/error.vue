<template>
  <div>
    <h1 v-if="error.statusCode === 404">?</h1>
    <h1 v-else>!</h1>
    <nuxt-link to="/">
      <button aria-label="Home">
        <p>Home</p>
      </button>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['error'],
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  width: 100vw;
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 7em;
    line-height: 0.5em;
    color: var(--color);
  }

  button {
    margin: 3px;
    border: 1px solid var(--color);
    border-radius: 20px 20px;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.5s ease;
    // cursor: pointer;
    pointer-events: auto;

    p {
      color: var(--color);
      font-size: 1.2em;
      padding: 0.5em;
    }

    &:active {
      background-color: var(--color);

      p {
        color: var(--bg);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      button:hover {
        background-color: var(--color);

        p {
          color: var(--bg);
        }
      }
    }
  }
}
</style>
