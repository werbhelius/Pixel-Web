<template lang="html">
    <div class="notify">
        <nav class="notify-tab" >
            <span class="tab-tag" v-on:click="switchNotify('at_me_status')" :class="currentPage == 'at_me_status'?'tab-select':''" >@我</span>
            <span class="tab-tag" v-on:click="switchNotify('at_me_comment')" :class="currentPage == 'at_me_comment'?'tab-select':''">@我的评论</span>
            <span class="tab-tag" v-on:click="switchNotify('receive_comment')" :class="currentPage == 'receive_comment'?'tab-select':''">收到的评论</span>
            <span class="tab-tag" v-on:click="switchNotify('send_comment')"  :class="currentPage == 'send_comment'?'tab-select':''">发出的评论</span>
        </nav>
        <div class="notify-content" >
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
 
<script>
export default {
    name: "notify",
    data() {
        return {
            currentPage: 'at_me_status'
        };
    },
    created() {
        this.showAtMeStatusPage()
    },
    activated() {
        var vue = this
        switch (vue.currentPage) {
            case 'at_me_status':
                vue.showAtMeStatusPage()
                break;
            case 'at_me_comment':
                vue.showAtMeCommentPage()
                break;
            case 'receive_comment':
                vue.showReceiveCommentPage()
                break;
            case 'send_comment':
                vue.showSendCommentPage()
                break;
            default:
                vue.showAtMeStatusPage()
                break;
        }
    },
    deactivated() {

    },
    methods: {
        showAtMeStatusPage() {
            this.$router.push({ name: 'atmestatus' })
            this.currentPage = 'at_me_status'
        },
        showAtMeCommentPage() {
            this.$router.push({ name: 'atmecomment' })
            this.currentPage = 'at_me_comment'
        },
        showReceiveCommentPage() {
            this.$router.push({ name: 'receivecomment' })
            this.currentPage = 'receive_comment'
        },
        showSendCommentPage() {
            this.$router.push({ name: 'sendcomment' })
            this.currentPage = 'send_comment'
        },
        switchNotify(page) {
            var vue = this
            switch (page) {
                case 'at_me_status':
                    vue.showAtMeStatusPage()
                    break;
                case 'at_me_comment':
                    vue.showAtMeCommentPage()
                    break;
                case 'receive_comment':
                    vue.showReceiveCommentPage()
                    break;
                case 'send_comment':
                    vue.showSendCommentPage()
                    break;
                default:
                    vue.showHomePage()
                    break;
            }
        }
    }
}
</script>
 
<style lang="css">
.notify {
    width: 100%;
    height: 100%;
}

.notify .notify-tab {
    width: 100%;
    height: 3.2rem;
    background: #FFFFFF;
    display: flex;
    flex-flow: row;
    text-align: center;
    line-height: 3.2rem;
    font-size: 1rem;
    position: fixed;
    bottom: 0;
    color: #5d5d5d;
    z-index: 30;
    border-top: 1px solid rgba(0, 0, 0, .05);
}

.notify .notify-tab.tab-fixed {
    position: fixed;
    top: 0rem;
}

.notify .notify-tab .tab-tag {
    flex: 1;
}

.notify .notify-tab .tab-tag.tab-select {
    color: #007AFF;
}

.notify .notify-content {
    width: 100%;
    height: 100%;
    margin-bottom: 3.2rem;
}
</style>
