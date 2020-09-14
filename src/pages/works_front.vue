<template>
  <div style="padding:0 5%">
    <div class="heading">
      <div style='height: 100%; width: 40vw'>
        <img class='crop' :src="require(`@/assets/works/${data[0].items[0].img}`)" />
        <p>{{ data[0].items[0].caption }}</p>
      </div>
      <div class="title">
        <h2 class="disc">{{ data[0].title }}</h2>
        <p>{{ data[0].desc }}</p>
      </div>
    </div>
    <div class='grid'>
      <div v-for="(items, i) in dat" :key="i" :id="`grid-item-${i}`">
        <img :src="require(`@/assets/works/${items.img}`)" />
        <p>{{ items.caption }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AllWorks from '@/components/AllWorks';

export default {
  props: {
    id: String,
  },
  data() {
    return {
    };
  },
  mixins: [AllWorks],
  created() {
    if (this.data === undefined || this.data.length === 0) {
      this.$router.push('/404');
      console.log('404');
    }
  },
  computed: {
    data() {
      return this.card.filter(
        (filter) => filter.url === `/works/${this.id}`,
      );
    },
    dat() {
      return this.data[0].items.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  padding: 10% 0 0 0;
  justify-content: space-around;
  align-items: center;
  text-transform: initial;
  letter-spacing: initial;
  height: 40vw;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(0, 1fr);
  max-width: 100vw;
  // justify-content: center;
  // top: -10vw;
}

.title {
  display: flex;
  align-items: flex-end;
  width: 40vw;
  position: relative;
  float: right;
  flex-direction: column;
  margin-left: auto;
}

.disc {
  text-indent: 0;
  margin-bottom: 5%;
}

.planet {
  height: 35vw;
  max-width: initial;
  position: absolute;
}

.cards {
  margin: 10px 10px;
}

.crop {
  object-fit: cover;
  height: 90%;
  width: 100%;
}
</style>
