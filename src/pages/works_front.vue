<template>
  <div>
    <component :is='work' />
  </div>
</template>

<script>
import * as components from './component';

export default {
  props: {
    work: String,
  },
  components,
};
</script>

<style lang="scss" scoped>

</style>
