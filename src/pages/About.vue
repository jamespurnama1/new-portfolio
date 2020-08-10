<template>
  <div>
    <block id='first'>
      <img src='@/assets/logo.png' />
      <div>
        <h1>about</h1>
        <h3>james henry</h3>
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
        <div class='center'>
          <video class='bg' loop muted autoplay>
            <source src='@/assets/sagoo6.mp4'>
          </video>
        </div>
    </block>
  </div>
</template>

<script>
export default {
  Name: 'About',
};
</script>

<style lang="scss" scoped>

</style>
