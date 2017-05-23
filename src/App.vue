<template>
    <div id="app">
        <keep-alive>
            <router-view class="app-view"></router-view>
        </keep-alive>
        <transition name="fade">
            <image-zoom class="click-img" v-if="showImage" ></image-zoom>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapGetters({
            showImage: 'image_zoom_show'
        })
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
}

.app-view {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    /*position: absolute;
    transition: transform 0.3s ease;*/
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
