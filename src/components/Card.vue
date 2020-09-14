<template>
  <div class='slide'>
    <router-link :to='`/works/${url}`'>
      <vue-aspect-ratio ar="3:2" width='35vw' class='card'>
        <div style='height: 90%'>
          <div class='center thumb'>
            <img :src='require(`@/assets/works/${url}/${url}.jpg`)'>
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
.slide:hover img {
  transform: scale(1.2);
}

img {
  transition: transform .5s ease;
}

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
  // transform: rotate(-90deg) translateY(-20%);
  margin: 0 10px;
  // height: 100%;
  min-width: 300px;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}

.thumb {
  border-radius: 15px 15px 0 0;
    min-height: 200px;
    max-height: 18vw;
    overflow: hidden;
    margin-bottom: 5px;
}

#caption {
  height: auto;
  padding: 0 5% 0 5%;
}

@media all and (max-width: 1280px) {
  .thumb {
    min-height: 150px;
    max-height: 16vw;
  }
}

@media all and (max-width: 980px) {
  .card {
    min-width: 450px;
  }

  .thumb {
    min-height: 220px;
  }
}

@media all and (max-width: 736px) {
  .card {
    min-width: 400px;
  }

  .thumb {
    min-height: 200px;
  }
}

@media all and (max-width: 480px) {
  .card {
    min-width: 300px;
  }

  .thumb {
    min-height: 130px;
  }
}
</style>
