import {
    RECEIVE_COMMENT,
    RECEIVE_COMMENT_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/receive_comment'
import { logger } from '../../utils/logger'

const state = {
    comments: [],
    option: {
        refresh: false,
        page: 1
    }
}

const mutations = {

    [RECEIVE_COMMENT](state, data) {
        //save in state
        state.comments = data
        state.option.page++
        logger('receive_comment', 'save store succeed !')
    },

    [RECEIVE_COMMENT_REFRESH](state, refresh) {
        if (refresh) {
            state.option.page = 1
        }
        state.option.refresh = refresh
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