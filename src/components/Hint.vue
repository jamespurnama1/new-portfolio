<template>
  <div id='absoluteCenter'>
    <transition name='fade'>
      <p v-show='idle' class='clickable' @click='nextBlock(0)'>
        {{ title }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Hint',
  data() {
    return {
      idle: false,
    };
  },
  props: {
    title: String,
  },
  onIdle() {
    this.idle = true;
  },
  onActive() {
    this.idle = false;
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
#absoluteCenter {
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  position: absolute;
}

@media (min-width: 320px) {
  #absoluteCenter {
    display: none;
  }
}
@media (min-width: 800px) {
  #absoluteCenter {
    display: initial;
  }
}
</style>
