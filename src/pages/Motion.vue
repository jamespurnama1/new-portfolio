<template>
<div>
    <Work
    :loop='`1`'
    :heading='`motion discoveries`'
    :desc='`Every work, assignments, freelance, and side projects
              taught and made me discover something new.`'
    />
  </div>
</template>

<script>
import Work from '@/components/Works.vue';
import AllWorks from '@/components/AllWorks';

export default {
  name: 'allWorks',
  data() {
    return {
      dat: '',
    };
  },
  components: {
    Work,
  },
  mixins: [AllWorks],
  created() {
    const dat = this.card.filter((item) => {
      const motion = Object.keys(item).some((key) => item[key].includes('motion'));
      return motion;
    });
    this.dat = dat;
  },
};
</script>
