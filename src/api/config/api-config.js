const key_config = {
    app_key: '3436445128',
    app_secret: '6a1d41d969da490d9a37d4457184ea0b',
    redirect_uri: 'http://192.168.74.7:8089/login'
}

const host_config = {
    host: 'https://api.weibo.com',
    oauth: 'https://open.weibo.cn/oauth2/authorize',
}

const api_router_config = {
    oauth_post: '/oauth2/access_token'
}

export const HOST_CONCIG = host_config;
export const KEY_CONFIG = key_config;
export const API_ROUTER_CONFIG = api_router_config;