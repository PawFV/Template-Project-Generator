module.exports = {
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/sass/_main.scss"; `
      }
    }
  }
}
