import axios from 'axios';
import { HOST_CONCIG, API_ROUTER_CONFIG } from '../../api/config/api-config'
import { logger } from '../../utils/logger'
import store from '../../store/'


export const postSendText = (status, okCallback, errorCallback) => {

    const accesstoken = store.getters.token.access_token

    var postData = {
        access_token: accesstoken,
        status: status
    }

    var config = {
        method: 'post',
        url: API_ROUTER_CONFIG.send_post_text,
        baseURL: HOST_CONCIG.host,
        data: postData,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config)
        .then(function (response) {
            logger("oauthPost-ok", 'postSendText response succeed')
            okCallback(response)
        })
        .catch(function (error) {
            console.log(error);
            errorCallback(error)
        })
}

export const postSendImg = (status, pic, okCallback, errorCallback) => {

    const accesstoken = store.getters.token.access_token
    let form = new FormData()
	form.append('access_token', accesstoken)
	form.append('status', status)
    form.append('pic', pic)
    var config = {
        method: 'post',
        url: API_ROUTER_CONFIG.send_post_image,
        baseURL: HOST_CONCIG.host,
        data: form,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    axios(config)
        .then(function (response) {
            logger("oauthPost-ok", 'postSendText response succeed')
            okCallback(response)
        })
        .catch(function (error) {
            console.log(error);
            errorCallback(error)
        })
}