<template>
  <div style='margin: 0 40px; min-width: 200px;'>
    <router-link to='planet/motion' class='center planet'>
    <div class='center planetImage'>
      <img :src='require(`@/assets/planets/${image}`)'>
    </div>
    <button>
      <p>{{ title }} planet</p>
    </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
    };
  },
  props: {
    title: String,
    image: String,
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 1em;
  margin: 0;
}

.planet {
  flex-direction: column;
}

img {
  width: auto;
  max-width: 70%;
}

.planetImage {
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.planetImage:hover {
  transform: rotate(15deg) scale(1.1);
}

#caption {
  padding: 0 5% 0 5%;
}
</style>
