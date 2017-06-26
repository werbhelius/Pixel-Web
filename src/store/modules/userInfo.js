import {
    USERINFO
} from '../mutations-type'

import { saveUserInfo, clearUserInfo, getUser } from '../../utils/user-storage'
import * as api from '../../api/impl/userInfo'
import { logger } from '../../utils/logger'

const state = {
    userInfo: {}
}

const mutations = {
    //login and save token
    [USERINFO](state, userInfo) {
        //save in state
        state.userInfo = userInfo   
        logger('userinfo', 'save store succeed !')
        console.log(userInfo)
        //save in localStorage
        saveUserInfo(userInfo)
    },

}

const actions = {
    // code : oauth2 授权后返回的code 
    getUserInfo: ({ commit }, uid) => {
        api.getUserInfo(
            uid,
            null,
            response => {
                commit(USERINFO, response)
            },
            err => {
                console.log(err);
            }
        )
    },
    getUser: ({ commit }) => {
        const userInfo = getUserInfo();
        if (userInfo) {
            commit(USERINFO, JSON.parse(token))
        }
    }
}

export default {
    state,
    actions,
    mutations
}