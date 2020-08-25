<template>
  <div>
    <div class='block background' ref='background'>
      <div class='center about'>
        <img class='clip' src='@/assets/portrait.jpg' />
        <h3>james henry</h3>
      </div>
      <div class='text'>
        <p>Born in Jakarta, Indonesia &amp; grew up in Bandung.
          Took advertising &amp; graphic design in The One Academy, Malaysia.
          Always has been amused with tech, design, and keeping up with trends.</p>
        <button>
          <a href='http://www.instagram.com/jamespurnama1' target='_blank'>instagram</a>
          <feather type="external-link" stroke='#575F6B' :size="15" />
        </button>
        <button>
          <a href='http://www.be.net/jamespurnama' target='_blank'>behance</a>
          <feather type="external-link" stroke='#575F6B' :size="15" />
        </button>
        <button>
          <a href='http://www.github.com/jamespurnama1' target='_blank'>github</a>
          <feather type="external-link" stroke='#575F6B' :size="15" />
        </button>
        <button>
          <a href='mailto:jamespurnama1@gmail.com' target='_blank'>email</a>
          <feather type="external-link" stroke='#575F6B' :size="15" />
        </button>
      </div>
      <!-- <div class='center bg' style='opacity: 30%'>
        <video class='bg' loop muted autoplay style='min-height: 100vh; min-width: 100vw;'>
          <source src='@/assets/reel.mp4'>
        </video>
      </div> -->
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  Name: 'About',
  mounted() {
    this.bg.to('html', {
      '--bgSize': '90%',
      '--bgIn': '400%',
      delay: 1,
      '--scaleBG': 1,
    });
  },
  data() {
    return {
      bg: gsap.timeline(),
    };
  },
};
</script>

<style lang="scss" scoped>
html {
  --bgSize: 0%;
  --bgIn: 800%;
  --scaleBG: 0;
}

.background::after {
  position: absolute;
  transform: scale(var(--scaleBG));
  opacity: 0.5;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: '';
  background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-position: 50% var(--bgIn);
  background-size: var(--bgSize);
  background-blend-mode: multiply;
  transition: all 1s ease-in-out;
}

h1 {
  text-align: center;
}

.about {
  flex-direction: column;
  width: min-content;
}

.text {
  width: min-content;
}

.block {
  flex-direction: column;
}

img {
  min-width: 300px;
}

.clip {
  clip-path: circle(50% at center);
  width: 45%;
}

button {
  margin: 5px 15px;
}

@media screen and (min-width: 320px){
  .block {
  padding-top: 20%;
  flex-direction: row;
  min-height: 100vh;
  }
  .text {
    margin: 0;
    width: 90vw;
  }
  h3 {
    font-size: calc(30px + 6 * ((100vw - 320px) / 680));
  }
}
@media screen and (min-width: 800px){
  .block {
  padding-top: 10%;
  flex-direction: row;
  }
  .text {
    margin: 0 10%;
  }
  h3 {
    font-size: 3em;
  }
}
</style>
