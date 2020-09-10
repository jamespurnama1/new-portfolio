<template>
<div>
    <Work
    :loop='`1`'
    :heading='`motion discoveries`'
    :card='dat'
    :desc='`Projects based on After Effects.`'
    />
  </div>
</template>

<script>
import Work from '@/components/Works.vue';
import AllWorks from '@/components/AllWorks';

export default {
  name: 'Motion',
  data() {
    return {
      dat: '',
    };
  },
  components: {
    Work,
  },
  props: {
    id: String,
  },
  mixins: [AllWorks],
  created() {
    if (this.id === 'works') {
      this.dat = this.card;
    } else {
      const rgx = new RegExp(`.*${this.id}.*`, 'gi');
      this.dat = this.card.filter((e) => e.caption.title.match(rgx));
    }
  },
};
</script>
