<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="home-logos scale-infinite">
      <img alt="Vue logo" src="../assets/logo.png" />
      <img
        alt="Js logo"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
      />
      <img
        alt="Sass logo"
        src="https://miro.medium.com/max/589/1*9U1toerFxB8aiFRreLxEUQ.png"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      message: 'Vue-js Paw & Bel template'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: $viewHeight;
  @include flex();
  flex-direction: column;
  img {
    width: 100px;
    margin-right: 10px;
  }
}
</style>
