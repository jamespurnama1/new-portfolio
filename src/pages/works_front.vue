<template>
  <div style="padding:0 5%">
    <div class="heading">
      <div class="feature">
        <img
          class="crop"
          :src="require(`@/assets/works/${data.url}/${data.items[0]}`)"
        />
        <p>{{ data.items[1] }}</p>
      </div>
      <div class="title">
        <h2 class="disc">{{ data.title }}</h2>
        <p>{{ data.desc }}</p>
      </div>
    </div>
    <div class="grid">
      <div v-for="(items, i) in dat" :key="i" :id="`grid-item-${i}`">
        <img
          v-if="items.endsWith('jpg')"
          :src="require(`@/assets/works/${data.url}/${items}`)"
        />
        <video
          v-else-if="items.endsWith('mp4')"
          :src="require(`@/assets/works/${data.url}/${items}`)"
        />
        <p v-else>{{ items }}</p>
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
    return {};
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
      return this.card.find((find) => find.url === this.id);
    },
    dat() {
      return this.data.items.slice(2);
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
  max-width: 100vw;
  column-count: 2;
  column-gap: 2em;
}

div[id^='grid-item-'],
div[id*='grid-item-'] {
  width: 100%;
  display: inline-block;
  margin: 2em 0;
}

.feature {
  height: 100%;
  width: 45%;
}

.title {
  display: flex;
  align-items: flex-end;
  width: 45%;
  position: relative;
  float: right;
  flex-direction: column;
  margin-left: auto;
}

.disc {
  text-indent: 0;
  margin-bottom: 5%;
}

.crop {
  object-fit: cover;
  height: 90%;
  width: 100%;
}
</style>
