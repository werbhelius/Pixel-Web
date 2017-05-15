import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import main from '../components/pixel/main'
import splash from '../components/splash'
import store from '../store/'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/splash',
      component: splash
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/splash'
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    store.dispatch('getToken')
    const login = store.getters.login
    if (login) {
      next();
    }
    else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})

export default router
