<template>
  <div style='padding:0 10%'>
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
      <Card
        v-for='(content, i) in dat'
        :key='i'
        :title='content.title'
        :url='content.url'
        :caption='content.caption'
        :thumbnail='content.thumbnail'
        class='cards' />
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
  max-width: 100vw;
  column-gap: 1em;
  column-count: 2;
  position: relative;
  top: -10vw;
}

.title {
  display: flex;
  width: 45%;
  position: relative;
  flex-direction: column;
  margin-left: auto;
}

.disc {
  text-indent: 0;
  width: 40%;
  word-break: keep-all;
  margin-bottom: 5%;
}

.planet {
  height: 35vw;
  max-width: initial;
}

.cards {
  width: 100%;
  display: inline-block;
  margin: 1em 0;
}

.seperator .cards:first-child {
  margin-top: 12vw;
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
