<template>
  <div style='padding:0 5%'>
    <div class='heading'>
      <img class='planet' src='@/assets/planets/Blue.png'>
      <div class='title'>
        <h2 style='text-align: right'>all<br>discoveries</h2>
        <p>Every work, assignments, freelance, and side projects
          taught and made me discover something new.</p>
      </div>
    </div>
    <div class='list'>
      <Card
        v-for='(content, index) in card.title' :key='index'
        :title='content'
        :url='card.url[index]'
        :caption='card.caption[index]'
        :thumbnail='card.thumbnail[index]'/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import AllWorks from '../components/AllWorks';

export default {
  name: 'works',
  components: {
    Card,
  },
  mixins: [AllWorks],
};
</script>

<style lang="scss" scoped>
.heading{
  display: flex;
  padding: 10% 5%;
  justify-content: space-between;
  text-transform: initial;
  letter-spacing: initial;
}

.list{
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-content: center;
  justify-content: center;
  background-color: initial;
  border: initial;
  box-shadow: initial;
}

p {
  text-align: right;
}

.title {
  display: flex;
  align-items: flex-end;
  width: 50%;
  position: relative;
  float: right;
  flex-direction: column;
}

.planet {
  height: 50%;
  max-width: initial;
}
</style>
