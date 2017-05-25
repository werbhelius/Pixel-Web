import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import userInfo from './modules/userInfo'
import home_timeline from './modules/home_timeline'
import public_timeline from './modules/public_timeline'
import my_content from './modules/my_content'
import image_zoom from './modules/image_zoom'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        auth,
        userInfo,
        home_timeline,
        public_timeline,
        my_content,
        image_zoom
    }
})