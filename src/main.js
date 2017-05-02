// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
