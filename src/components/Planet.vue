<template>
  <div style='margin: 0 40px; min-width: 200px;'>
    <router-link to='planet/motion' class='center planet'>
    <div class='center planetImage'>
      <img :src='require(`@/assets/planets/${planetImage}`)'>
    </div>
    <button>
      <p>{{ planet }} planet</p>
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
    planet: String,
    planetImage: String,
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
  padding-top: 10%;
  margin-bottom: 3%;
}

#caption {
  padding: 0 5% 0 5%;
}
</style>
