<template lang="html">
    <div class="explore" id="explore">
        <div class="list"  v-for="x in list">
            <pixel-content :x="x"></pixel-content>
        </div>
        <div class="refresh-footer" v-if="loading">
            <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "explore",
    data() {
        return {
            list: [],
            loading: true,
            page: 1
        };
    },
    computed: {
        ...mapGetters({
            statuses: 'public_timeline',
            refresh: 'public_timeline_refresh',
            showImage: 'image_zoom_show'
        })
    },
    watch: {
        refresh: function (val) {
            if (val == true) {
                this.list = []
                this.page = 1
            }
        },
        statuses: function (val, oldVal) {
            if (val) {
                if (this.page == 1) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                    this.page ++
                }
                this.loading = false
            }
        }
    },
    created() {
        setTimeout(() => {
            this.publicTimeline(this.page)
        }, 1500)
    },
    mounted() {

    },
    activated() {
        window.addEventListener('scroll', this.scrollBar)
    },
    deactivated() {
        window.removeEventListener('scroll', this.scrollBar)
    },
    methods: {
        ...mapActions([
            'getPublicTimeline'
        ]),
        publicTimeline(page) {
            this.getPublicTimeline(page)
        },
        loadMore() {
            let vue = this
            this.loading = true
            setTimeout(() => {
                var page = this.page + 1
                vue.getPublicTimeline(page)
            }, 1500)
        },
        scrollBar() {
            var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
            var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
            if (a + b == c && !this.showImage) {
                this.loadMore()
            }
        }
    }

}
</script>
 
<style lang="css">
.list {
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-bottom: .8rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

.refresh-footer {
    margin-bottom: .8rem;
    margin-top: .8rem;
    text-align: center;
}
</style>