<template>
  <div class='planet'>
    <router-link to='planet/motion' class='center'>
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
  flex-direction: row;
  margin: 0 50px;
  min-width: 500px;
}

img {
  width: auto;
  max-width: 70%;
}

.planetImage {
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.planetImage:hover {
  transform: rotate(15deg) scale(1.1);
}

button {
    transform: translateX(-30%);
    border-radius: 0 15px 15px 0;
    z-index: 0;
    position: relative;
}
</style>
