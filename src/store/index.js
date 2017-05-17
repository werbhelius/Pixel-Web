import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import userInfo from './modules/userInfo'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        auth,
        userInfo
    }
})