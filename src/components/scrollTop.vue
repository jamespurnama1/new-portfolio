<template>
  <div class='center clickable'>
    <feather type="arrow-up" stroke='#575F6B' :size="27" />
  </div>
</template>

<script>
export default {
  name: 'scrollTop',
};
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 5%;
  left: 5%;
  z-index: 5;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 50%;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}
</style>
