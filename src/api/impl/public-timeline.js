import axios from 'axios';
import { HOST_CONCIG, API_ROUTER_CONFIG, DEBUG } from '../../api/config/api-config'
import { logger } from '../../utils/logger'
import store from '../../store/'
import * as data from '../../assets/debug-data/getData'


export const getPublicTimeline = (page, okCallback, errorCallback) => {

    if (DEBUG) {
        setTimeout(function () {
            okCallback(data.publictimeline)
        }, 1500)
        return
    }


    const accesstoken = store.getters.token.access_token
    var request_data = {
        access_token: accesstoken,
        count: 30,
        page: page
    }

    var config = {
        method: 'get',
        url: API_ROUTER_CONFIG.public_timeline,
        baseURL: HOST_CONCIG.host,
        params: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config)
        .then(function (response) {
            logger("oauthPost-ok", 'getPublicTimeline response succeed')
            okCallback(response.data)
        })
        .catch(function (error) {
            console.log(error);
            errorCallback(error)
        })
}