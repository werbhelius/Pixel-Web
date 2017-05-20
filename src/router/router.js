import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Main from '../components/Main'
import Home from '../components/Home'
import Splash from '../components/Splash'
import ImageZoom from '../components/ImageZoom'
import store from '../store/'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/splash',
            component: Splash
        },
        {
            path: '/imageZoom',
            name: 'imageZoom',
            component: ImageZoom,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: 'home',
                name: 'home',
                component: Home,
                meta: {
                    requiresAuth: true
                }
            }]
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
