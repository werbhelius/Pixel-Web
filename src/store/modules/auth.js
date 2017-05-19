import {
    LOGIN,
    LOGOUT,
    TOKEN
} from '../mutations-type'

import { saveToken, clearToken, getToken } from '../../utils/token-storage'
import { oauthPost } from '../../api/impl/auth'

const state = {
    token: {},
    login: false,
    logout: true
}

const mutations = {
    //login and save token
    [LOGIN](state, token) {
        //save in state
        state.token = token
        state.login = true
        state.logout = false
        //save in localStorage
        saveToken(token)
    },

    //logout and clear token
    [LOGOUT](state) {
        //clear state
        state.token = {}
        state.login = false
        state.logout = true
        //clear token
        clearToken()
    }
}

const actions = {
    // code : oauth2 授权后返回的code 
    login: ({ commit }, code) => {
        oauthPost(
            code,
            response => {
                commit(LOGIN, response.data)
            },
            err => {
                console.log(err);
            }
        )
    },
    getToken: ({ commit }) => {
        const token = getToken();
        if (token) {
            commit(LOGIN, JSON.parse(token))
        }
    }
}

export default {
    state,
    actions,
    mutations
}