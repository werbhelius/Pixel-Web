import Vue from 'vue'
import Router from 'vue-router'
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
import MyFollower from '../components/MyFollower'
import MyFriend from '../components/MyFriend'
import MyContent from '../components/MyContent'
import DetailContent from '../components/DetailContent'
import Post from '../components/SendPost'
import ImageZoom from '../components/ImageZoom'
import store from '../store/'
import * as scrollUtils from '../utils/scroll-position'
import { DEBUG } from '../api/config/api-config'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/splash',
            component: Splash,
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
            path: 'my-fllower',
            name: 'my-fllower',
            component: MyFollower,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: 'my-friend',
            name: 'my-friend',
            component: MyFriend,
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

let routerList = []

router.beforeEach((to, from, next) => {

    let position = scrollUtils.getScrollTop()
    let currentRouterIndex = routerList.findIndex(e => {
        return e.path === from.fullPath
    })

    if (currentRouterIndex != -1) {
        routerList[currentRouterIndex].position = position
    } else {
        routerList.push({
            path: from.fullPath,
            position: position
        })
    }

    store.dispatch('getToken')
    if (to.meta.requiresAuth) {
        if (DEBUG) {
            next()
        } else {
            const login = store.getters.login
            if (login) {
                next()
            }
            else {
                next({
                    path: '/splash'
                })
            }
        }
    } else {
        next()
    }
    next()
})

router.afterEach((to, from, next) => {

    let savedPosition = routerList.find(e => {
        return e.path === to.fullPath
    })

    if (typeof savedPosition !== 'undefined') {
        Vue.nextTick(() => {
            scrollUtils.setScrollTop(savedPosition.position)
        })
    } else {
        Vue.nextTick(() => {
            scrollUtils.setScrollTop(0)
        })
    }
})

export default router
