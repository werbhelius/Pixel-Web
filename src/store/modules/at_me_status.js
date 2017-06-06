import {
    AT_ME_STATUS,
    AT_ME_STATUS_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/at_me_status'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    option: {
        refresh: false,
        page: 1
    }
}

const mutations = {

    [AT_ME_STATUS](state, data) {
        //save in state
        state.statuses = data
        state.option.page++
        logger('at_me_status', 'save store succeed !')
    },

    [AT_ME_STATUS_REFRESH](state, refresh) {
        if (refresh) {
            state.option.page = 1
        }
        state.option.refresh = refresh
        logger('at_me_status', refresh)
    }


}

const actions = {

    getAtMeStatus: ({ commit }, page) => {

        console.log('getAtMeStatus');

        if (page == 1){
            commit(AT_ME_STATUS_REFRESH, true)
        } else{
            commit(AT_ME_STATUS_REFRESH, false)
        }

        api.getAtMeStatus(
            page,
            response => {
                commit(AT_ME_STATUS, response.statuses)
                commit(AT_ME_STATUS_REFRESH, false)
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