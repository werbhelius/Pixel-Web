import {
    SEND_COMMENT,
    SEND_COMMENT_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/send_comment'
import { logger } from '../../utils/logger'

const state = {
    comments: [],
    option: {
        refresh: false,
        page: 1
    }
}

const mutations = {

    [SEND_COMMENT](state, data) {
        //save in state
        state.comments = data
        state.option.page++
        logger('send_comment', 'save store succeed !')
    },

    [SEND_COMMENT_REFRESH](state, refresh) {
        if (refresh) {
            state.option.page = 1
        }
        state.option.refresh = refresh
        logger('send_comment', refresh)
    }


}

const actions = {

    getMySendComment: ({ commit }, page) => {

        console.log('getMySendComment');

        if (page == 1){
            commit(SEND_COMMENT_REFRESH, true)
        } else{
            commit(SEND_COMMENT_REFRESH, false)
        }

        api.getMySendComment(
            page,
            response => {
                commit(SEND_COMMENT, response.comments)
                commit(SEND_COMMENT_REFRESH, false)
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