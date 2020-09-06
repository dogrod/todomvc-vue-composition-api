module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/todomvc-vue-composition-api/'
    : '/'
}