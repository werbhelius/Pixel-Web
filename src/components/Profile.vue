<template lang="html">
    <div class="profile">
        <div class="back" v-on:click="goBack">
            <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
        </div>
        <div class="profile-header" :style="{backgroundImage:'url(' + userInfo.cover_image_phone + ')'}">
            <img class="header-avatar"  v-if="userInfo" :src="userInfo.avatar_large">
            <span class="header-name">{{userInfo.screen_name}}</span>
            <span class="header-bio">{{userInfo.description}}</span>
            <div class="header-info">
                <nav class="info-tab">
                    <span class="info-tag" v-on:click="switchTab('home')" >微博 {{formatNum(userInfo.statuses_count)}}</span>
                    <span class="info-tag" v-on:click="showMyFriend" >关注 {{formatNum(userInfo.friends_count)}}</span>
                    <span class="info-tag" v-on:click="showMyFollower" >粉丝 {{formatNum(userInfo.followers_count)}}</span>
                </nav>
            </div>
        </div>
        <div id="content">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
import * as StringUtils from '../utils/string-utils'
export default {
    name: "profile",
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters({
            token: 'token',
            userInfo: 'userInfo',
        })
    },
    created() {

    },
    mounted() {

    },
    activated() {
        this.getUserInfo(this.token.uid)
        this.showMyContent()
    },
    methods: {
        ...mapActions([
            'getUserInfo'
        ]),
        showMyContent() {
            this.$router.push({ name: 'myContent' })
        },
        showMyFollower() {
            this.$router.push({ name: 'my-fllower' })
        },
        showMyFriend() {
            this.$router.push({ name: 'my-friend' })
        },
        goBack() {
            this.$router.go(-2)
        },
        formatNum(num) {
            return StringUtils.formatNum(num)
        },
    }
}
</script>
 
<style lang="css">
.profile-header {
    width: 100%;
    height: 16rem;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-flow: column;
    z-index: 250;
}

.profile-header .header-avatar {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-top: 3rem;
    margin-left: 50%;
    transform: translateX(-50%);
    border: 1px solid rgba(0, 0, 0, .05);
}

.profile-header .header-info {
    width: 100%;
    height: 4rem;
}

.profile-header .header-name {
    color: #ffffff;
    display: inline-block;
    text-align: center;
    font-size: 10px;
    font-weight: 800;
    margin-top: .5rem;
}

.profile-header .header-bio {
    color: #ffffff;
    display: inline-block;
    text-align: center;
    font-size: 10px;
    font-weight: 800;
}

.info-tab {
    width: 100%;
    height: 3rem;
    display: flex;
    flex-flow: row;
    text-align: center;
    line-height: 3rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
}

.info-tab .info-tag {
    flex: 1;
}

.profile .back {
    color: #FFFFFF;
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 150;
}

.content {}
</style>