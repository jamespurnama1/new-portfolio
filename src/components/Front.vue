<template>
  <div class="hello">
    <h1>Principles</h1>
    <h3>Philosophies</h3>
    <ul>
      <li v-for='index in philosophies.length+1'
      :key='index' :philosophies='content'>
        <a :href='`#${index}`' rel='noopener'>{{ philosophies[index-1] }}</a>
      </li>
    </ul>
    <div class='center'>
      <p>
        Scroll down to view the interactivity
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Front',
  props: {
    philosophies: Array,
  },
  data() {
    return {
      content: '',
    };
  },
};

</script>

<style scoped lang="scss">
.center {
  position: absolute;
  bottom: 10%;
}
</style>
