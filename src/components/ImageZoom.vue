<template lang="html">
    <div id="zoomDiv" class="image-zoom">
        <div class="image-close" v-on:click="goBack">
            <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
        </div>
        <div class="image-div" :class="over?'tran':''" >
            <img id="img" class="img" :src="image_zoom_url">
        </div>
    </div>
</template>
 
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: "image-zoom",
    data() {
        return {
            over: false
        }
    },
    computed: {
        ...mapGetters({
            image_zoom_url: 'image_zoom_url'
        }),
    },
    mounted() {
        var vue = this
        var img = document.getElementById('img')
        var zoom = document.getElementById('zoomDiv')
        img.onload = function () {
            if (img.offsetHeight > zoom.offsetHeight) {
                vue.over = true
            } else {
                vue.over = false
            }
        }

    },
    methods: {
        ...mapActions([
            'setImageZoom'
        ]),
        goBack() {
            this.setImageZoom(null)
            window.history.go(-1)
        }
    }
}
</script>
 
<style lang="css" scoped>
.image-zoom {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    z-index: 150;
    overflow: auto;
}

.image-zoom .image-close {
    color: #007AFF;
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 150;
}

.image-zoom .image-div {
    max-width: 100%;
    height: auto;
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    top: 50%;
    transform: translateY(-50%);
    -webkit-overflow-scrolling: touch;
}

.image-zoom .tran {
    top: 0 ;
    transform: translateY(0) ;
}
</style>