import {
    PUBLIC_TIMELINE,
    REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/public-timeline'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    refresh: false
}

const mutations = {

    [PUBLIC_TIMELINE](state, data) {
        //save in state
        state.statuses = data
        logger('public-timeline', 'save store succeed !')
    },

    [REFRESH](state, refresh) {
        state.refresh = refresh
        logger('public-timeline-refresh', refresh)
    }

}

const actions = {

    getPublicTimeline: ({ commit }, page) => {

        if (page == 1){
            commit(REFRESH, true)
        } else{
            commit(REFRESH, false)
        }

        api.getPublicTimeline(
            page,
            response => {
                commit(PUBLIC_TIMELINE, response.statuses)
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