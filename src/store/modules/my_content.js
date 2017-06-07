import {
    MY_CONTENT,
    PROFILE_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/my-content'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    option: {
        refresh: false,
        page: 1
    }
}

const mutations = {

    [MY_CONTENT](state, data) {
        //save in state
        state.statuses = data
        logger('my-content', 'save store succeed !')
    },

    [PROFILE_REFRESH](state, refresh) {
        if (refresh) {
            state.option.page = 1
        }
        state.option.refresh = refresh
        logger('my-content', refresh)
    }


}

const actions = {

    getMyContent: ({ commit }, page) => {

        console.log('getMyContent');

        if (page == 1){
            commit(PROFILE_REFRESH, true)
        } else{
            commit(PROFILE_REFRESH, false)
        }

        api.getMyContent(
            page,
            response => {
                commit(MY_CONTENT, response.statuses)
                commit(PROFILE_REFRESH, false)
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