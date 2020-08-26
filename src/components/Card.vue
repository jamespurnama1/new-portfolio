<template>
  <div>
    <router-link :to='url'>
      <vue-aspect-ratio ar="3:2" width='30vw' class='card'>
        <div style='height: 100%'>
          <div class='center thumb'>
            <img :src='require(`@/assets/${thumbnail}`)'>
          </div>
          <div id='caption'>
            <h3>{{ title }}</h3>
            <p>{{ caption.title }}</p>
            <p>{{ caption.type }}</p>
            <p>{{ caption.year }}</p>
          </div>
        </div>
      </vue-aspect-ratio>
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
    url: String,
    title: String,
    thumbnail: String,
    caption: Object,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  line-height: 1em;
  color: #575F6B;
}

p {
  font-size: 0.8em;
  margin: 0;
  line-height: 1.2em;
}

.card {
  // min-width: 200px;
  transform: rotate(-90deg) translateY(-20%);
  margin: 30% 0;
  height: 60%;
  min-width: 95%;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}

.thumb {
  border-radius: 15px 15px 0 0;
  max-height: 78%;
  overflow: hidden;
  margin-bottom: 1.5%;
}

#caption {
  height: auto;
  padding: 0 5% 0 5%;
}

@media screen and (min-width: 320px) {
  h3 {
    font-size: calc(20px + 6 * ((100vw - 320px) / 680));
  }
}
@media screen and (min-width: 800px) {
  h3 {
    font-size: 1.5em;
  }
}
</style>
