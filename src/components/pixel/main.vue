<template lang="html">
    <div>
        <div class="list" v-for="x in list">
           <div class="list-header">
                <img class="avatar" v-if="x.user" :src="x.user.avatar_large">
                <div class="user-info">
                    <h3 class="user-name" v-if="x.user">{{x.user.name}}</h3>
                    <span class="user-source">来自 Pixel.Web</span>
                </div>
                <span class="user-time">2小时前</span>
            </div>
            <div class="list-content">
                <span class="content-text">{{x.text}}</span>
            </div>
        </div>
    </div>
    
</template>

<script>

import { getHomeTimeline } from '../../api/impl/home-timeline'

export default {
    name: "main",
    data() {
        return {
            list: [],
            loading: false,
            page: 1
        }
    },
    created() {
        this.homeTimeline(this.page)
    },
    methods: {
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
        }
    }
}
</script>

<style lang="css">
.list {
    background-color: #fff;
    border-radius: 2px;
    padding: 1rem;
    margin-top: 1.5rem;
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
</style>
