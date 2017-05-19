<template lang="html">
    <div class="home">
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
import { getHomeTimeline } from '../../api/impl/home-timeline'
export default {
    name: "home",
    data() {
        return {
            list: [],
            loading: true,
            page: 1
        };
    },
    computed: {
        ...mapGetters({
            statuses: 'home_timeline',
            refresh: 'home_timeline_refresh'
        })
    },
    watch: {
        refresh: function (val) {
            if (val) {
                this.list = []
            }
        },
        statuses: function (val, oldVal) {
            if (val) {
                if (this.page == 1) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                }
            }
        }
    },
    created() {
        setTimeout(() => {
            this.homeTimeline(this.page)
        }, 1500)
    },
    mounted() {
        let vue = this
        window.addEventListener('scroll', function () {
            var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
            var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
            if (a + b == c) {
                vue.loadMore();
            }
        })
    },
    methods: {
        ...mapActions([
            'getHomeTimeline'
        ]),
        homeTimeline(page) {
            this.getHomeTimeline(page)
        },
        loadMore() {
            let vue = this
            this.loading = true
            setTimeout(() => {
                this.page++
                vue.homeTimeline(this.page)
            }, 1500)
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