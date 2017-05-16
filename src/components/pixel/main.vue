<template lang="html">
    <div class="main">
        <header class="user-header">
            <img class="header-avatar" src="../../assets/icon.png">
        </header>

        <div class="list" v-for="x in list">
           <div class="list-header">
                <img class="avatar" v-if="x.user" :src="x.user.avatar_large">
                <div class="user-info">
                    <h3 class="user-name" v-if="x.user">{{x.user.name}}</h3>
                    <span class="user-source">来自 Pixel.Web</span>
                </div>
                <span class="user-time" >{{formatTime(x.created_at)}}</span>
            </div>
            <div class="list-content">
                <span class="content-text" v-html="formatContent(x.text)"></span>
            </div>
        </div>
    </div>
    
</template>

<script>

import { getHomeTimeline } from '../../api/impl/home-timeline'
import { getUserInfo } from '../../api/impl/userInfo'
import * as DateUtils from '../../utils/date-utils'
import * as StringUtils from '../../utils/string-utils'
import { mapGetters } from 'vuex'

export default {
    name: "main",
    data() {
        return {
            list: [],
            loading: false,
            page: 1
        }
    },
    computed: {
        ...mapGetters({
            token: 'token'
        }),
    },
    created() {
        // this.userInfo(this.token.uid)
        // this.homeTimeline(this.page)
    },
    methods: {
        userInfo(uid) {
            getUserInfo(uid, null,
                data => {

                },
                err => {

                })
        },
        homeTimeline(page) {
            var vue = this;
            getHomeTimeline(
                page,
                data => {
                    console.log(vue.list);
                    vue.loading = false;
                    vue.list = [...vue.list, ...data.statuses]
                },
                err => {
                    console.log(err);
                }
            )
        },
        loadMore() {
            let vue = this
            this.loading = true
            setTimeout(() => {
                this.page++
                homeTimeline(this.page)
            }, 500)
        },
        formatTime(time) {
            return DateUtils.format(time);
        },
        formatContent(content) {
            return StringUtils.formatContent(content)
        }
    }
}
</script>

<style lang="css">
.user-header {
    width: 100%;
    height: 8rem;
    background: #ffffff;
    margin-bottom: 1.5rem;
    z-index: 250;
    position: fixed;
    top: 0px;
    padding: 1rem;
}

.user-header .header-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .05);
    position: absolute;
    right: 0px;
    margin: 0 1rem
}

a {
    color: #007AFF;
}

.list {
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

.list .list-header {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
}

.list .avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
}

.list .user-info {
    margin-left: 1rem;
    display: flex;
    flex-flow: column;
    flex: 1;
}

.list .user-time {
    font-size: 1rem;
    color: #A4A8AC;
    height: 100%;
    display: table-cell
}

.list .user-info .user-name {
    margin: 0;
    flex: 1;
    font-size: 1.5rem;
}

.list .user-info .user-source {
    margin: 0;
    flex: 1;
    font-size: 1rem;
    color: #A4A8AC
}

.list .list-content {
    margin-top: .7rem;
}

.list .list-content .content-text {
    font-size: 1.3rem;
    line-height: 1rem;
}

.list .list-content .content-at {
    color: #007AFF;
}
</style>
