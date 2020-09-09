<template>
<div>
    <Work
    :loop='`1`'
    :heading='`all discoveries`'
    :card='card'
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
  components: {
    Work,
  },
  mixins: [AllWorks],
};
</script>
