<template>
  <div class='center' style='height: 100vh; overflow: hidden'>
    <div class='about'>
      <div class='center' style='flex-direction: column; margin-bottom: 50px'>
        <img class='clip' src='@/assets/portrait.jpg' />
        <h2>james henry</h2>
      </div>
      <div class='text'>
        <p>Born in Jakarta, Indonesia &amp; grew up in Bandung.
          Took advertising &amp; graphic design in The One Academy, Malaysia.
          Always has been amused with tech, design, and keeping up with trends.</p>
          <div class='center' style='flex-wrap: wrap'>
            <button>
              <a href='http://www.instagram.com/jamespurnama1' target='_blank'><p>instagram</p></a>
              <feather type="external-link" stroke='#575F6B' :size="15" />
            </button>
            <button>
              <a href='http://www.be.net/jamespurnama' target='_blank'><p>behance</p></a>
              <feather type="external-link" stroke='#575F6B' :size="15" />
            </button>
            <button>
              <a href='http://www.github.com/jamespurnama1' target='_blank'><p>github</p></a>
              <feather type="external-link" stroke='#575F6B' :size="15" />
            </button>
            <button>
              <a href='mailto:jamespurnama1@gmail.com' target='_blank'><p>email</p></a>
              <feather type="external-link" stroke='#575F6B' :size="15" />
            </button>
            <button>
              <a href='/james_resume.pdf' download target='_blank'><p>download resume</p></a>
              <feather type="download" stroke='#575F6B' :size="15" />
            </button>
          </div>
      </div>
    </div>
    <div class='center bg'>
      <video
      loop
      muted
      preload='true'
      autoplay>
        <source src='@/assets/BG2.mp4'>
      </video>
    </div>
  </div>
</template>

<script>
export default {
  Name: 'About',
};
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

h1 {
  text-align: center;
}

.about {
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 1;
  width: 70%;
}

.block {
  flex-direction: column;
}

img {
  min-width: 300px;
}

.clip {
  clip-path: circle(50% at center);
  width: 30%;
  min-width: 100px;
}

button {
  margin: 10px 10px;
}

a p {
  margin: 0;
}

video {
  object-fit: cover;
  width: 100vw;
  z-index: 0;
}

.text {
  width: 50vw;
  margin: 0 auto;
  flex-direction: column;
}

.feather {
  margin-left: 5px;
}

@media all and (max-width: 320px){
  // .block {
  // padding-top: 20%;
  // flex-direction: row;
  // min-height: 100vh;
  // }
  .text {
    margin: 0;
    width: 90vw;
  }
}
</style>
