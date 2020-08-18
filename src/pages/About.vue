<template>
  <div>
    <div class='block'>
      <div class='center about'>
        <img class='clip' src='@/assets/portrait.jpg' />
        <h3>james henry</h3>
      </div>
      <div class='text'>
        <!-- <h1>about</h1> -->
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
export default {
  Name: 'About',
};
</script>

<style lang="scss" scoped>
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
  width: 40%;
  min-width: 300px;
}

.clip {
  clip-path: circle(50% at center);
  width: 45%;
}

p {
  // width: 40%;
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
