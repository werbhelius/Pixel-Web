import ImageZoom from './src/ImageZoom'

ImageZoom.install = function (Vue) {
    Vue.component(ImageZoom.name, ImageZoom)
}

export default ImageZoom