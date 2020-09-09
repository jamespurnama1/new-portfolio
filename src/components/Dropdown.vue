<template>
  <div id='dropdown'>
    <ul>
      <li><a href='/interactivity' class='margin'>interactivity</a></li>
      <li><a href='/photography' class='margin'>photography</a></li>
      <li><a href='/motion' class='margin'>motion</a></li>
      <li><a href='/branding' class='margin'>branding</a></li>
      <li><a href='/works' class='margin'>all works</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
  },
};
</script>

<style lang="scss" scoped>
div {
    // position: absolute;
    // left: 43%;
    // top: 5%;
    padding: 20px;
    background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
    border-radius: 0 0 15px 15px;
    box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}

li {
  display: block;
}
</style>
