<template>
  <div style='padding:0 5%'>
    <div class='heading'>
      <video
      class='planet'
      autoplay
      loop
      muted
      preload='true'>
      <source :src='require(`@/assets/planets/loop${loop}.webm`)'>
      </video>
      <div class='title'>
        <h2 class='disc'>{{ heading }}</h2>
        <p>{{ desc }}</p>
      </div>
    </div>
    <div class='seperator'>
    <div class='list'>
      <Card
        v-for='(content, i) in firstHalf'
        :key='i'
        :title='content.title'
        :url='content.url'
        :caption='content.caption'
        :thumbnail='content.thumbnail'
        class='cards' />
    </div>
    <div class='list'>
      <Card
        v-for='(content, i) in secondHalf'
        :key='i'
        :title='content.title'
        :url='content.url'
        :caption='content.caption'
        :thumbnail='content.thumbnail'
        class='cards' />
    </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'works',
  components: {
    Card,
  },
  data() {
    return {
      firstHalf: '',
      secondHalf: '',
    };
  },
  props: {
    desc: String,
    heading: String,
    loop: String,
    card: Object,
  },
  created() {
    const dat = this.card;
    const half = Math.ceil(dat.length / 2);
    this.firstHalf = dat.splice(0, half);
    this.secondHalf = dat.splice(-half);
  },
};
</script>

<style lang="scss" scoped>
.heading{
  display: flex;
  padding: 10% 0 0 0;
  justify-content: space-between;
  text-transform: initial;
  letter-spacing: initial;
}

.seperator {
  display: flex;
  max-width: 100vw;
  position: relative;
  justify-content: center;
  top: -10vw;
}

.list{
  display: flex;
  flex-wrap: wrap;
  max-width: 40vw;
  align-content: center;
  justify-content: center;
  background-color: initial;
  border: initial;
  box-shadow: initial;
}

.list:first-child {
  position: relative;
  margin-top: 35%;
}

p {
  text-align: right;
}

.title {
  display: flex;
  align-items: flex-end;
  width: 65vw;
  position: relative;
  float: right;
  flex-direction: column;
  margin-left: auto;
}

.disc {
  text-align: right;
  word-spacing: 100vw;
  width: 100%;
  word-break: keep-all;
}

.planet {
  height: 35vw;
  max-width: initial;
  position: absolute;
}

.cards {
  margin: 10px 10px;
}

@media (max-width: 980px) {
  .seperator {
    position: relative;
    flex-direction: column;
    top: 0;
    left: 0;
  }

  .list {
    max-width: none;
  }

  .list:first-child {
    margin-top: 0;
  }
}
</style>
