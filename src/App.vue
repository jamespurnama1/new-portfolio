<template>
  <div id="app">
    <Navbar />
    <main>
      <transition
        name="fade"
        mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'JamesHenry',
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
};

</script>

<style lang="scss">
@import './src/styles/buefy.module.scss';
@import './src/styles/fonts.module.scss';

button {
  font-family: '35-FTR';
  font-size: 1em;;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  border: none;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
  padding: 10px 20px;
  display: inline-block;
}

button:active {
  border:none
}

h1 {
  text-align: left;
  font-size: 10em;
  color: black;
  font-weight: 700;
  line-height: 0.7em;
  text-indent: -0.2em;
}

h3 {
  font-family: '35-FTR';
  font-weight: 700;
  font-size: 1.5em;
  color:black;
  text-decoration: none;
}

p {
  margin-bottom: 1em;
}

html, body {
  font-family: '35-FTR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #D8D9DA;
}

</style>
