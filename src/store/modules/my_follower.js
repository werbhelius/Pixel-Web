import {
    MY_FOLLOWER,
    MY_FOLLOWER_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/my_follower'
import { logger } from '../../utils/logger'

const state = {
    users: [],
    option: {
        refresh: false,
        cursor: 1
    }
}

const mutations = {

    [MY_FOLLOWER](state, data) {
        //save in state
        state.users = data
        state.option.cursor++
        logger('my_follower', 'save store succeed !')
    },

    [MY_FOLLOWER_REFRESH](state, refresh) {
        if(refresh){
            state.option.cursor = 1
        }
        state.option.refresh = refresh
        logger('my_follower', refresh)
    }


}

const actions = {

    getMyFollower: ({ commit } , cursor) => {

        console.log('getMyFollower');

        if (cursor == 0){
            commit(MY_FOLLOWER_REFRESH, true)
        } else{
            commit(MY_FOLLOWER_REFRESH, false)
        }

        api.getMyFollower(
            response => {
                commit(MY_FOLLOWER, response.users)
                commit(MY_FOLLOWER_REFRESH, false)
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