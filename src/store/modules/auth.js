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

const getters = {
    token: state => state.token.access_token
}

const mutations = {
    //login and save token
    [LOGIN](state, token) {
        //save in state
        state.token.access_token = token.access_token
        state.token.expires_in = token.expires_in
        state.token.remind_in = token.remind_in
        state.token.uid = token.uid
        state.login = true
        state.logout = false
        //save in localStorage
        saveToken(token)
    },

    //logout and clear token
    [LOGOUT](state) {
        //clear state
        state.token.access_token = ""
        state.token.expires_in = ""
        state.token.remind_in = ""
        state.token.uid = ""
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
                console.log("okok");
                commit(LOGIN, response.data)
            },
            err => {
                console.log("error-error");
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
    getters,
    actions,
    mutations
}