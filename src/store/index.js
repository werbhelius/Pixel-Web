import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        auth
    }
})