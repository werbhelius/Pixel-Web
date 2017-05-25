import {
    MY_CONTENT,
    REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/my-content'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    refresh: false
}

const mutations = {

    [MY_CONTENT](state, data) {
        //save in state
        state.statuses = data
        logger('my-content', 'save store succeed !')
    },

    [REFRESH](state, refresh) {
        state.refresh = refresh
        logger('my-content', refresh)
    }


}

const actions = {

    getMyContent: ({ commit }, page) => {

        if (page == 1){
            commit(REFRESH, true)
        } else{
            commit(REFRESH, false)
        }

        api.getMyContent(
            page,
            response => {
                commit(MY_CONTENT, response.statuses)
                commit(REFRESH, false)
            },
            err => {
                console.log(err);
            }
        )
    }
}

export default {
    state,
    actions,
    mutations
}