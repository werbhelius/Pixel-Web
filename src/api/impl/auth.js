import axios from 'axios';
import { HOST_CONCIG, KEY_CONFIG, API_ROUTER_CONFIG } from '../../api/config/api-config'

export const oauthPost = (code) => {
    var oauthData = {
        "client_id": KEY_CONFIG.app_key,
        "client_secret": KEY_CONFIG.app_secret,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": KEY_CONFIG.redirect_uri
    }

    var config = {
        method: 'post',
        url: API_ROUTER_CONFIG.oauth_post,
        baseURL: HOST_CONCIG.host,
        data: oauthData,
        withCredentials: true
    }

    return axios(config);
}