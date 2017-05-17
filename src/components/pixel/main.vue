<template lang="html">
    <div class="main" :class="tabFixed?'list-padding':''" >
        <div class="user-header">
            <img class="header-avatar" v-if="userInfo" :src="userInfo.avatar_large">
            <span class="header-name">{{userInfo.name}}</span>
        </div>
        <nav class="switch-tab" :class="tabFixed?'tab-fixed':''">
            <span class="tab-tag" >主页</span>
            <span class="tab-tag" >探索</span>
            <span class="tab-tag" >消息</span>
        </nav>

        <div class="list"  v-for="x in list">
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
import * as DateUtils from '../../utils/date-utils'
import * as StringUtils from '../../utils/string-utils'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "main",
    data() {
        return {
            list: [],
            loading: false,
            page: 1,
            tabFixed: false
        }
    },
    computed: {
        ...mapGetters({
            token: 'token',
            userInfo: 'userInfo'
        }),
    },
    created() {
        this.getUserInfo(this.token.uid)
        this.homeTimeline(this.page)
    },
    mounted() {
        let vue = this
        window.addEventListener('scroll', function () {
            let y = window.scrollY
            if (y >= 60) {
                vue.tabFixed = true
            } else {
                vue.tabFixed = false
            }
        })
    },
    methods: {
        ...mapActions([
            'getUserInfo'
        ]),
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
        },
        tabScroll() {
            console.log(window.scrollY)
        }
    }
}
</script>

<style lang="css">
.main.list-padding {
    padding-top: 3.5rem;
}

.user-header {
    width: 100%;
    height: 5rem;
    background: #ffffff;
    top: 0px;
    padding: 1rem;
    display: flex;
    flex-flow: row;
}

.switch-tab {
    width: 100%;
    height: 3.5rem;
    background: #ffffff;
    display: flex;
    flex-flow: row;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #999999;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.switch-tab.tab-fixed {
    position: fixed;
    top: 0rem;
}

.switch-tab .tab-tag {
    flex: 1;
}

.user-header .header-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .05);
}

.user-header .header-name {
    flex: 1;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 3rem;
    padding-left: 1.2rem;
}

a {
    color: #007AFF;
}

.list {
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-bottom: .8rem;
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
    border: 1px solid rgba(0, 0, 0, .05);
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
