import {
    DETAILCONTENT
} from '../mutations-type'


const state = {
    content : {}
}

const mutations = {

    [DETAILCONTENT](state, data) {
        //save in state
        state.content = data
    }

}

const actions = {
    setDetailContent: ({ commit }, content) => {
        commit(DETAILCONTENT, content)
    }
}

export default {
    state,
    actions,
    mutations
}