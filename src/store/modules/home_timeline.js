import {
    HOME_TIMELINE,
    HOME_TIMELINE_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/home-timeline'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    refresh: false
}

const mutations = {

    [HOME_TIMELINE](state, data) {
        //save in state
        state.statuses = data
        logger('home-timeline', 'save store succeed !')
    },

    [HOME_TIMELINE_REFRESH](state, refresh) {
        state.refresh = refresh
        logger('home-timeline-refresh', refresh)
    }


}

const actions = {

    getHomeTimeline: ({ commit }, page) => {

        if (page == 1){
            commit(HOME_TIMELINE_REFRESH, true)
        } else{
            commit(HOME_TIMELINE_REFRESH, false)
        }

        api.getHomeTimeline(
            page,
            response => {
                commit(HOME_TIMELINE, response.statuses)
                commit(HOME_TIMELINE_REFRESH, false)
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