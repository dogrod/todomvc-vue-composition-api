module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/todomvc-vue-composition-api/'
    : '/',
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Vue Composition API · TodoMVC',
    },
  }
}