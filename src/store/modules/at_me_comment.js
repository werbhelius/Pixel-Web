import {
    AT_ME_COMMENT,
    AT_ME_COMMENT_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/at_me_comment'
import { logger } from '../../utils/logger'

const state = {
    comments: [],
    option: {
        refresh: false,
        page: 1
    }
}

const mutations = {

    [AT_ME_COMMENT](state, data) {
        //save in state
        state.comments = data
        state.option.page++
        logger('at_me_comment', 'save store succeed !')
    },

    [AT_ME_COMMENT_REFRESH](state, refresh) {
        if (refresh) {
            state.option.page = 1
        }
        state.option.refresh = refresh
        logger('at_me_comment', state.option.refresh)
    }


}

const actions = {

    getAtMeComment: ({ commit }, page) => {

        console.log('getAtMeComment');

        if (page == 1) {
            commit(AT_ME_COMMENT_REFRESH, true)
        } else {
            commit(AT_ME_COMMENT_REFRESH, false)
        }

        api.getAtMeComment(
            page,
            response => {
                commit(AT_ME_COMMENT, response.comments)
                commit(AT_ME_COMMENT_REFRESH, false)
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