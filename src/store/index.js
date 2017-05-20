import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import userInfo from './modules/userInfo'
import home_timeline from './modules/home_timeline'
import image_zoom from './modules/image_zoom'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        auth,
        userInfo,
        home_timeline,
        image_zoom
    }
})