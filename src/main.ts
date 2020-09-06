import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import App from './App.vue'

import 'todomvc-app-css/index.css'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
