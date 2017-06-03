import {
    CONTENT_COMMENTS,
    CONTENT_COMMENTS_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/content_comments'
import { logger } from '../../utils/logger'

const state = {
    comments: [],
    refresh: false
}

const mutations = {

    [CONTENT_COMMENTS](state, data) {
        //save in state
        state.comments = data
        logger('content-comments', 'save store succeed !')
    },

    [CONTENT_COMMENTS_REFRESH](state, refresh) {
        state.refresh = refresh
        logger('content-comments-refresh', refresh)
    }


}

const actions = {

    getContentComments: ({ commit }, data) => {
        
        let id = data.id
        let page = data.page

        if (page == 1){
            commit(CONTENT_COMMENTS_REFRESH, true)
        } else{
            commit(CONTENT_COMMENTS_REFRESH, false)
        }
        api.getContentComments(
            id,
            page,
            response => {
                commit(CONTENT_COMMENTS, response.comments)
                commit(CONTENT_COMMENTS_REFRESH, false)
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