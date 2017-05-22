import {
    IMAGE_ZOOM
} from '../mutations-type'


const state = {
    image_url: '',
    show: false
}

const mutations = {

    [IMAGE_ZOOM](state, data) {
        //save in state
        state.image_url = data
        if (data) {
            state.show = true
        } else {
            state.show = false
        }
    }

}

const actions = {

    setImageZoom: ({ commit }, url) => {
        commit(IMAGE_ZOOM, url)
    }

}

export default {
    state,
    actions,
    mutations
}