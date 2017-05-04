import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import main from '../components/pixel/main'
import splash from '../components/splash'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/splash',
      component: splash
    },
    {
      path: '/main',
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
    next();
})

export default router
