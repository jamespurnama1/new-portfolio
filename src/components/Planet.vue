<template>
  <div class='planet' @mouseover='planet = gif' @mouseleave='planet = png'>
    <router-link to='planet/motion' class='center'>
    <div class='center planetImage'>
      <img
      :src='require(`@/assets/planets/${planet}`)'>
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
      planet: this.static,
      png: this.static,
      gif: this.image,
    };
  },
  props: {
    title: String,
    image: String,
    static: String,
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 1em;
  margin: 0;
  margin-left: auto;
  text-align: right;
}

.planet {
  flex-direction: row;
  margin: 0 1vw;
  // min-width: 300px;
  // width: 50vw;
}

img {
  width: 15vw;
  max-width: none;
}

.planetImage {
  position: relative;
  z-index: 1;
  // overflow: hidden;
  transition: all 1s ease-in-out;
}

.planet:hover button {
  transform: translateX(-40%);
  padding: 15px 25px;
}

button {
  transform: translateX(-50%);
  border-radius: 0 15px 15px 0;
  min-width: 15vw;
  z-index: 0;
  position: relative;
}
</style>
