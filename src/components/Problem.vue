<template>
  <div class='problem'>
    <p style='font-weight: 900'>Enter today's date:</p>
    <p>{{ dateString }}</p>
    <div style='display:flex'>
    <button @click='minus()'>
      <feather type="minus" stroke='#575F6B' :size="27" />
    </button>
    <button @click='add()'>
      <feather type="plus" stroke='#575F6B' :size="27" />
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Problem',
  data() {
    return {
      date: 0,
      dateString: 'Thu Jan 01 1970',
    };
  },
  methods: {
    minus() {
      const current = this.date - 86400000;
      this.date = current;
    },
    add() {
      const current = this.date + 86400000;
      this.date = current;
    },
  },
  watch: {
    date() {
      this.dateString = new Date(this.date).toDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
.problem {
  top: 10%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}

p {
  margin: 0;
}

button {
  margin: 10px;
}
</style>
