<template lang="html">
    <div class="receive-comment">
        <div class="list" v-for="comment in list">
             <pixel-at-me-comment :comment="comment"></pixel-at-me-comment> 
        </div>
        <div class="refresh-footer" v-if="loading">
            <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "receive-comment",
    data() {
        return {
            list: [],
            loading: true,
            page: 1
        };
    },
    computed: {
        ...mapGetters({
            comments: 'receive_comment',
            refresh: 'receive_comment_refresh'
        })
    },
    watch: {
        refresh: function (val) {
            if (val == true) {
                this.list = []
                this.page = 1
            }
        },
        comments: function (val, oldVal) {
            if (val) {
                if (this.page == 1) {
                    this.list = val
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
            this.receiveComment(this.page)
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
            'getMyReceiveComment'
        ]),
        receiveComment(page) {
            this.getMyReceiveComment(page)
        },
        loadMore() {
            let vue = this
            this.loading = true
            setTimeout(() => {
                var page = this.page ++
                vue.receiveComment(page)
            }, 1500)
        },
        scrollBar() {
            var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
            var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
            if (a + b == c && !this.showImage) {
                this.loadMore();
            }
        }
    }
}
</script>
 
<style lang="css">
.receive-comment .list {
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-bottom: .8rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

.receive-comment .refresh-footer {
    margin-bottom: .8rem;
    margin-top: .8rem;
    text-align: center;
}
</style>
