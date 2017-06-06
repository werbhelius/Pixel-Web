<template lang="html">
    <div class="my-follower">
         <div class="follower-header">
            <div class="follower-close" v-on:click="goBack">
                <svg class="close-icon" viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
            </div>
            <div class="follower-send" >
                <span class="follower-text">我的粉丝</span>
            </div>
        </div>
        <div class="follower-list" v-for="user in list">
            <pixel-user :user="user"></pixel-user>
        </div>
        <div class="refresh-footer" v-if="loading">
            <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "my-follower",
    data() {
        return {
            list: [],
            loading: true,
            cursor: 1
        };
    },
    computed: {
        ...mapGetters({
            comments: 'my_follower',
            refresh: 'my_follower_refresh'
        })
    },
    watch: {
        refresh: function (val) {
            if (val == true) {
                this.list = []
                this.cursor = 1
            }
        },
        comments: function (val, oldVal) {
            if (val) {
                if (this.cursor == 1) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                    this.cursor++
                }
                this.loading = false
            }
        }
    },
    created() {
        setTimeout(() => {
            this.myFollower(this.cursor)
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
            'getMyFollower'
        ]),
        goBack(){
            this.$router.go(-1)
        },
        myFollower(cursor) {
            this.getMyFollower(cursor)
        },
        loadMore() {
            let vue = this
            this.loading = true
            setTimeout(() => {
                var cursor = this.cursor + 1
                vue.myFollower(cursor)
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
.my-follower {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-flow: column;
}

.follower-header {
    width: 100%;
    height: 4rem;
    background-color: #ffffff;
    display: flex;
    flex-flow: rom;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
    margin-bottom: 1rem;
}

.follower-header .follower-close {
    color: #007AFF;
    width: 2rem;
    height: 2rem;
    margin: 1rem;
    position: relative;
}

.follower-header .close-icon {
    width: 2rem;
    height: 2rem;
}

.follower-header .follower-send {
    width: 4rem;
    height: 100%;
    opacity: .7;
    flex: 1;
}

.follower-header .follower-send .follower-text {
    color: #5d5d5d;
    margin: 0;
    padding: 0;
    line-height: 4rem;
    margin-left: 1rem;
    font-weight: 900;
    font-size: 1.4rem;
}

.follower-list {
    background-color: #fff;
    border-radius: 2px;
}

.refresh-footer {
    margin-bottom: .8rem;
    margin-top: .8rem;
    text-align: center;
}

</style>
