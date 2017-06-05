import PixelUserInfo from './src/UserInfo'

PixelUserInfo.install = function (Vue) {
    Vue.component(PixelUserInfo.name, PixelUserInfo)
}

export default PixelUserInfo