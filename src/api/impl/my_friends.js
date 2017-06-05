import axios from 'axios';
import { HOST_CONCIG, API_ROUTER_CONFIG } from '../../api/config/api-config'
import { logger } from '../../utils/logger'
import store from '../../store/'


export const getMyFriend = (okCallback, errorCallback) => {

    const accesstoken = store.getters.token.access_token
    const uid = store.getters.token.uid

    var request_data = {
        access_token: accesstoken,
        uid: uid
    }

    var config = {
        method: 'get',
        url: API_ROUTER_CONFIG.my_friend,
        baseURL: HOST_CONCIG.host,
        params: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config)
        .then(function (response) {
            logger("oauthPost-ok", 'getMyFriend response succeed')
            okCallback(response.data)
        })
        .catch(function (error) {
            console.log(error);
            errorCallback(error)
        })
}