<template>
  <div id='absoluteCenter'>
    <transition name='fade'>
      <p v-show='idle' class='clickable' @click='nextBlock(0)'>
        Scroll down to discover more
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
  onIdle() {
    this.idle = true;
  },
  onActive() {
    this.idle = false;
  },
};
</script>

<style lang="scss" scoped>
#absoluteCenter {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}
</style>
