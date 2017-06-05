<template>
    <div id="app">
        <transition name="fade">
            <keep-alive>
                <router-view  class="app-view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'app'
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

.app-view {}

.fade-enter-active{
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
