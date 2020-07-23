<template>
  <div>
    <footer class="footer">
      <div class="content has-text-left pa-1">
        <ul>
         <li>Design Principles</li>
         <li>{{ title.text }}</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    title: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
