<template lang="html">
    <div class="image-zoom">
        <div class="image-close" v-on:click="goBack">
            <svg  viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
        </div>
        <div class="img-div" :style="{backgroundImage:'url(' + image_zoom_url + ')'}"></div>
    </div>
</template>
 
<script>

import { mapGetters } from 'vuex'

export default {
    name: "image-zoom",
    computed: {
        ...mapGetters({
            image_zoom_url: 'image_zoom_url'
        }),
    },
    methods: {
        goBack() {
            
        }
    }
}
</script>
 
<style lang="css">
.image-zoom {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    position: relative;
}

.image-zoom .image-close {
    color: #007AFF;
    width: 2rem;
    height: 2rem;
    margin: 1rem;
}

.image-zoom .img-div {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
}
</style>