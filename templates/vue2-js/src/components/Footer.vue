<template>
  <div class="Footer">
    <p>
      Made with 💗 by
      <b>
        <a href="https://github.com/PawFV/" target="_blank">Paw</a>
      </b>
      &
      <b>
        <a href="https://github.com/belueg" target="_blank">Bel</a>
      </b>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.Footer {
  border-top: $pbborder;
  height: $footerHeight;
  @include flex();
  @include posFixed(100%);
  transform: translate(-50%, -100%);
  width: 100%;
}
</style>
