<template lang="html">
    <div class="main" :class="tabFixed?'list-padding':''" >
        <div class="user-header">
            <img class="header-avatar" v-if="userInfo" :src="userInfo.avatar_large">
            <span class="header-name">{{userInfo.name}}</span>
            <div class="header-refresh" v-on:click="refresh">
                <svg t="1495096269758" viewBox="0 0 1024 1024" style="width=100%; height=100% ;fill: currentcolor"><path d="M512 15.147929C237.596178 15.147929 15.147929 237.596178 15.147929 512 15.147929 786.403822 237.596178 1008.85207 512 1008.85207 753.949359 1008.85207 959.556929 834.720477 1001.237325 599.108919 1003.176241 588.14858 1004.748832 577.104295 1005.950555 565.989614 1007.389418 552.681622 997.767587 540.726932 984.459595 539.288068 971.1516 537.849204 959.196912 547.471035 957.758048 560.779028 956.673455 570.81037 955.25442 580.776255 953.505081 590.66494 915.903569 803.219328 730.336118 960.378699 512 960.378699 264.367283 960.378699 63.621302 759.632717 63.621302 512 63.621302 264.367283 264.367283 63.621302 512 63.621302 692.540089 63.621302 853.297857 171.303651 923.740292 334.175772 929.053881 346.461485 943.320936 352.113508 955.60665 346.799919 967.892364 341.48633 973.544389 327.219275 968.230798 314.933561 890.18049 134.471036 712.044363 15.147929 512 15.147929Z" p-id="2336"></path><path d="M945.23443 345.905095 969.471116 321.668407 718.011835 321.668407C704.626282 321.668407 693.775147 332.519542 693.775147 345.905095 693.775147 359.290646 704.626282 370.141781 718.011835 370.141781L969.471116 370.141781C982.856669 370.141781 993.707804 359.290646 993.707804 345.905095L993.707804 78.730923C993.707804 65.345371 982.856669 54.494237 969.471116 54.494237 956.085565 54.494237 945.23443 65.345371 945.23443 78.730923L945.23443 345.905095Z" p-id="2337"></path></svg>
            </div>
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
            'getUserInfo',
            'getHomeTimeline'
        ]),
        showHomePage() {
            this.$router.push({ name: 'home' })
            this.currentPage = 'home'
        },
        refresh() {
            this.getHomeTimeline(1);
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
    padding-top: 4.5rem;
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

.user-header .header-refresh {
    width: 1.8rem;
    height: 1.8rem;
    margin-top: .5rem;
    color: #999999;
}

.switch-tab {
    width: 100%;
    height: 4.5rem;
    background: #ffffff;
    display: flex;
    flex-flow: row;
    text-align: center;
    line-height: 5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #999999;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    position: relative;
    z-index: 99;
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
