import {
    RECEIVE_COMMENT,
    RECEIVE_COMMENT_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/receive_comment'
import { logger } from '../../utils/logger'

const state = {
    comments: [],
    refresh: false
}

const mutations = {

    [RECEIVE_COMMENT](state, data) {
        //save in state
        state.comments = data
        logger('receive_comment', 'save store succeed !')
    },

    [RECEIVE_COMMENT_REFRESH](state, refresh) {
        state.refresh = refresh
        logger('receive_comment', refresh)
    }


}

const actions = {

    getMyReceiveComment: ({ commit }, page) => {

        console.log('getMyReceiveComment');

        if (page == 1){
            commit(RECEIVE_COMMENT_REFRESH, true)
        } else{
            commit(RECEIVE_COMMENT_REFRESH, false)
        }

        api.getMyReceiveComment(
            page,
            response => {
                commit(RECEIVE_COMMENT, response.comments)
                commit(RECEIVE_COMMENT_REFRESH, false)
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