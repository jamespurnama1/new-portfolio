<template>
  <div>
    <vue-aspect-ratio ar="3:2" width='30vw' class='card'>
      <div style='height: 100%'>
        <div class='center thumb'>
          <img :src='require(`@/assets/${thumbnail}`)'>
        </div>
        <div id='caption'>
          <h3>{{ cardTitle }}</h3>
          <p>{{ caption.title }}</p>
          <p>{{ caption.type }}</p>
          <p>{{ caption.year }}</p>
        </div>
      </div>
  </vue-aspect-ratio>
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
    cardTitle: String,
    thumbnail: String,
    caption: Object,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.7em;
  line-height: 1em;
  color: #575F6B;
}

p {
  font-size: 0.8em;
  margin: 0;
  line-height: 1.2em;
}

.card {
  min-width: 30%;
  // height: 90%;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
  margin: 0 20px;
  overflow: hidden;
}

.thumb {
  height: 74%;
  overflow: hidden;
  margin-bottom: 1.5%;
}

#caption {
  padding: 0 5% 0 5%;
}
</style>
