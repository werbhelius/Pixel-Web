import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Main from '../components/Main'
import Home from '../components/Home'
import Explore from '../components/Explore'
import Notify from '../components/Notify'
import AtMeStatus from '../components/notify/AtMeStatus'
import AtMeComment from '../components/notify/AtMeComment'
import ReceiveComment from '../components/notify/ReceiveComment'
import sendComment from '../components/notify/sendComment'
import Splash from '../components/Splash'
import Profile from '../components/Profile'
import MyContent from '../components/MyContent'
import DetailContent from '../components/DetailContent'
import Post from '../components/SendPost'
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
            component: ImageZoom
        },
        {
            path: 'detail-content',
            name: 'detail-content',
            component: DetailContent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: 'post',
            name: 'post',
            component: Post,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: 'myContent',
                name: 'myContent',
                component: MyContent,
                meta: {
                    requiresAuth: true
                }
            }]
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
            },
            {
                path: 'explore',
                name: 'explore',
                component: Explore,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'notify',
                name: 'notify',
                component: Notify,
                meta: {
                    requiresAuth: true
                },
                children: [
                    {
                        path: 'atmestatus',
                        name: 'atmestatus',
                        component: AtMeStatus,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'atmecomment',
                        name: 'atmecomment',
                        component: AtMeComment,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'receivecomment',
                        name: 'receivecomment',
                        component: ReceiveComment,
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'sendcomment',
                        name: 'sendcomment',
                        component: sendComment,
                        meta: {
                            requiresAuth: true
                        }
                    }
                ]
            }]
        },
        {
            path: '*',
            redirect: '/splash'
        }
    ]
})

let indexScrollTop = 0
let dom = null
let content = null

let savePosition = function () {
    dom = document.querySelector('.app-view')
    indexScrollTop = dom.scrollTop
}

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        store.dispatch('getToken')
        const login = store.getters.login
        if (login) {
            next()
        }
        else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

router.afterEach((to, from, next) => {
    Vue.nextTick(() => {
        dom = document.querySelector('.app-view')
        dom.scrollTop = 0
    });
})

export default router
