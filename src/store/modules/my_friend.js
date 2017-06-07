import {
    MY_FRIEND,
    MY_FRIEND_REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/my_friends'
import { logger } from '../../utils/logger'

const state = {
    users: [],
    option: {
        refresh: false,
        cursor: 1
    }
}

const mutations = {

    [MY_FRIEND](state, data) {
        //save in state
        state.users = data
        state.option.cursor++
        logger('my_friend', 'save store succeed !')
    },

    [MY_FRIEND_REFRESH](state, refresh) {
        if(refresh){
            state.option.cursor = 1
        }
        state.option.refresh = refresh
        logger('my_friend', refresh)
    }


}

const actions = {

    getMyFriend: ({ commit } , cursor) => {

        console.log('getMyFriend');

        if (cursor == 0){
            commit(MY_FRIEND_REFRESH, true)
        } else{
            commit(MY_FRIEND_REFRESH, false)
        }

        api.getMyFriend(
            response => {
                commit(MY_FRIEND, response.users)
                commit(MY_FRIEND_REFRESH, false)
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