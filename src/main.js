// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PixelContent from './views/Content/index'
import PixelSpinner from './views/Spinner/index'
import ImageZoom from './views/ImageZoom/index'
import router from './router/router'
import store from './store/'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(VueMaterial)
Vue.use(PixelContent)
Vue.use(PixelSpinner)
Vue.use(ImageZoom)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
