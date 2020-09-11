<template>
  <div class='planet' @mouseover='planet = gif' @mouseleave='planet = png'>
    <router-link to='planet/motion' class='center'>
    <div class='center planetImage'>
      <img
      :src='`/planets/${planet}`'>
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
  font-size: 1.4em;
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
  min-width: 170px;
}

.planetImage {
  position: relative;
  z-index: 1;
  // overflow: hidden;
  transition: all 1s ease-in-out;
}

.planet:hover button {
  transform: translateX(-2vw);
  padding: 15px 15px 15px 13%;
}

button {
  transform: translateX(-4vw);
  border-radius: 0 15px 15px 0;
  width: 7vw;
  min-width: 100px;
  z-index: 0;
  position: relative;
  padding: 10px 10px 10px 13%;
}
</style>
