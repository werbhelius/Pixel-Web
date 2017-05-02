import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import main from '../components/pixel/main'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/main',
      component: main,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
    next();
})

export default router
