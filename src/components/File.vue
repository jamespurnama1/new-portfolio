<template>
<div class='file'>
  <div id='file'>
    <feather style='cursor: move' type='file' stroke='#575F6B' fill='#D8D9DA' :size="50" />
    <p style='font-size: 1em; line-height: 1em'>delete<br>me.pdf</p>
  </div>
  <div id='trash'>
    <feather type='trash' stroke='#575F6B' :size="50" />
  </div>
</div>
</template>
<style lang="scss">
#file {
  transform: translate(-501px, 219px);
}

.file {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  // top: -10%;
}
</style>
