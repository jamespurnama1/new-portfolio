<template>
  <div style="padding:20px 10%">
    <div class="heading">
      <div class="feature">
          <img
          class="crop"
          v-if="data.items[0].item.endsWith('.jpg')
          || data.items[0].item.endsWith('.png')
          || data.items[0].item.endsWith('.gif')"
          :src="require(`@/assets/works/${data.url}/${data.items[0].item}`)"
        />
        <video
        loop
        autoplay
        muted
        class="crop"
          v-else-if="data.items[0].item.endsWith('.mp4' || '.webm')"
          :src="require(`@/assets/works/${data.url}/${data.items[0].item}`)"
        />
        <p>{{ data.items[0].caption }}</p>
      </div>
      <div class="title">
        <h3 class="disc">{{ data.title }}</h3>
        <p>{{ data.desc }}</p>
      </div>
    </div>
    <!-- <div class="grid"> -->
      <masonry
      :cols='{default: 2, 700: 1}'
      :gutter='10'
      >
        <div v-for="(items, i) in dat"
        :key="i"
        :id="`grid-item-${i}`">
          <div
          v-if="items.item.endsWith('.jpg') || items.item.endsWith('.png')">
            <img
              :src="require(`@/assets/works/${data.url}/${items.item}`)"
            />
            <p v-if='items.caption'>{{ items.caption }}</p>
          </div>
          <div
          v-else-if="items.item.endsWith('.mp4') || items.item.endsWith('.webm')">
            <video
            loop
            autoplay
            muted
              :src="require(`@/assets/works/${data.url}/${items.item}`)"
            />
            <p v-if='items.caption'>{{ items.caption }}</p>
          </div>
        </div>
      </masonry>
    <!-- </div> -->
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
    }
  },
  computed: {
    data() {
      return this.works.find((find) => find.url === this.id);
    },
    dat() {
      return this.data.items.slice(1);
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
  // height: 40vw;
}

.grid {
  max-width: 100vw;
  // column-count: 2;
  // column-gap: 2em;
  //   display: grid;
  // grid-gap: 1em;
  // grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  // grid-auto-rows: 0;
}

div[id^='grid-item-'],
div[id*='grid-item-'] {
  width: 100%;
  display: inline-block;
  margin: 0 auto;
}

img, video {
  margin: 0 auto;
  display: block;
}

.feature {
  height: 100%;
  width: 45%;
}

.title {
  display: flex;
  align-items: flex-start;
  width: 48%;
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

@media (max-width: 980px) {
  .grid {
  column-count: 1;
}
}
</style>
