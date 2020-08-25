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
  transform: rotate(-90deg);
  flex-direction: row;
  margin: 40% 0;
  min-width: 200px;
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
    transform: translateX(-35%);
    border-radius: 0 15px 15px 0;
    z-index: 0;
    position: relative;
}
</style>
