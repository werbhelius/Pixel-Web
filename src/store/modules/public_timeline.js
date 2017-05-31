import {
    PUBLIC_TIMELINE,
    PUBLIC_REFRESH
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

    [PUBLIC_REFRESH](state, refresh) {
        state.refresh = refresh
        logger('public-timeline-refresh', refresh)
    }

}

const actions = {

    getPublicTimeline: ({ commit }, page) => {

         console.log('getPublicTimeline');

        if (page == 1){
            commit(PUBLIC_REFRESH, true)
        } else{
            commit(PUBLIC_REFRESH, false)
        }

        api.getPublicTimeline(
            page,
            response => {
                commit(PUBLIC_TIMELINE, response.statuses)
                commit(PUBLIC_REFRESH, false)
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