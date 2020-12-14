<template>
  <div class="NavBar">
    <img src="@/assets/favicon.png" class="NavBar-logo" />
    <div class="NavBar-nav">
      <Button text="item 1" color="blue" />
      <Button text="item 2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
.NavBar {
  @include flex(space-between);

  padding: 20px;
  border-bottom: $pbborder;
  height: $navHeight;
  &-nav {
    @include flex();
    button {
      margin-right: 10px;
    }
  }
}
</style>
