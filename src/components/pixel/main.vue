<template lang="html">
    <div class="main" :class="tabFixed?'list-padding':''" >
        <div class="user-header">
            <img class="header-avatar" v-if="userInfo" :src="userInfo.avatar_large">
            <span class="header-name">{{userInfo.name}}</span>
        </div>
        <nav class="switch-tab" :class="tabFixed?'tab-fixed':''">
            <span class="tab-tag" :class="currentPage == 'home'?'tab-select':''" >主页</span>
            <span class="tab-tag" :class="currentPage == 'explore'?'tab-select':''">探索</span>
            <span class="tab-tag" :class="currentPage == 'message'?'tab-select':''">消息</span>
        </nav>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name: "main",
    data() {
        return {
            tabFixed: false,
            currentPage: 'home'
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
        this.showHomePage()
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
        showHomePage() {
            this.$router.push({ name: 'home' })
            this.currentPage = 'home'
        },
        tabScroll() {
            console.log(window.scrollY)
        }
    }
}
</script>

<style lang="css">
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

.main.list-padding {
    padding-top: 4rem;
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
    height: 4rem;
    background: #ffffff;
    display: flex;
    flex-flow: row;
    text-align: center;
    line-height:  4rem;
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

.switch-tab .tab-tag.tab-select {
    color: #007AFF;
    border-bottom: 2px solid #007AFF;
}
</style>
