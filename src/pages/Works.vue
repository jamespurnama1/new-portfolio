<template>
  <div style='padding:0 5%'>
    <div class='heading'>
      <video
      class='planet'
      autoplay
      loop
      muted
      preload='true'>
      <source :src='require(`@/assets/planets/loop_${id}.webm`)'>
      </video>
      <div class='title'>
        <h2 class='disc'>{{ data[0].heading }}</h2>
        <p>{{ data[0].desc }}</p>
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
import Card from '@/components/Card.vue';
import AllWorks from '@/components/AllWorks';
import Planets from '@/components/Planets';

export default {
  name: 'works',
  components: {
    Card,
  },
  data() {
    return {
      firstHalf: '',
      secondHalf: '',
      dat: '',
      data: '',
    };
  },
  props: {
    id: String,
  },
  mixins: [AllWorks, Planets],
  created() {
    const who = this.planet.filter((filter) => filter.path === this.id);
    this.data = who;
    if (this.data === undefined || this.data.length === 0) {
      this.$router.push('/404');
      console.log('404');
    }
    if (this.id === 'all') {
      this.dat = this.card;
    } else {
      const rgx = new RegExp(`.*${this.id}.*`, 'gi');
      this.dat = this.card.filter((e) => e.caption.title.match(rgx));
    }
    const half = Math.ceil(this.dat.length / 2);
    this.firstHalf = this.dat.splice(0, half);
    this.secondHalf = this.dat.splice(-half);
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

.list:last-child {
  position: relative;
  // transform: translateY(-5%);
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

  .list:last-child {
  transform: translateY(0);
  }
}
</style>
