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