<template lang="html">
    <div class="home">
        <div class="list"  v-for="x in list">
           <div class="list-header">
                <img class="avatar" v-if="x.user" :src="x.user.avatar_large">
                <div class="user-info">
                    <h3 class="user-name" v-if="x.user">{{x.user.name}}</h3>
                    <span class="user-source" v-html="x.source"></span>
                </div>
                <span class="user-time" >{{formatTime(x.created_at)}}</span>
            </div>
            <div class="list-content">
                <span class="content-text" v-html="formatContent(x.text)"></span>
                <div  class="content-img">
                    <ul  class="content-img-ul clear-fix">
                        <li v-for="y in x.pic_urls" class="img-li-default" :class= "imgClass(x.pic_urls.length)"  >
                            <div class="img-div" :style="{backgroundImage:'url(' + formatMidImg(y.thumbnail_pic) + ')'}"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import * as DateUtils from '../../utils/date-utils'
import * as StringUtils from '../../utils/string-utils'
import { mapActions, mapGetters } from 'vuex'
import { getHomeTimeline } from '../../api/impl/home-timeline'
export default {
    name: "home",
    data () {
        return {
            list: [],
            loading: false,
            page: 1
        };
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
        },
        formatTime(time) {
            return DateUtils.format(time);
        },
        formatContent(content) {
            return StringUtils.formatContent(content)
        },
        compareImgSize(size) {
            let count = size/3
            if(count >= 1){
                return true
            }else {
                return false
            }
        },
        formatMidImg(img) {
            return StringUtils.formatImgMiddle(img)
        },
        imgClass(size){
            let clazz = ''
            switch (size) {
                case 1:
                clazz = 'img-li-one'
                break;
                case 2:
                case 4: 
                clazz = 'img-li-two'
                break;
                default :   
                clazz = 'img-li-other'
                break;
            }
            return clazz;
           
        }
    }
    
}
</script>
 
<style lang="css">
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

.list .user-info .user-source a {
    color: #A4A8AC;
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
.clear-fix::after{
    content: '';
    display: block;
    clear: both;
}
.list .list-content .content-img .content-img-ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.content-img .content-img-ul .img-li-default {
    float: left;
    height: 0;
    margin-top: .4rem;
    margin-right: .4rem
}

.content-img .content-img-ul .img-li-one {
    width: 52%;
    padding-bottom: 52%;
}

.content-img .content-img-ul .img-li-two {
    width: 43%;
    padding-bottom: 43%;
}

.content-img .content-img-ul .img-li-other {
    width: 28%;
    padding-bottom: 28%;
}

.content-img .content-img-ul .img-div {
    width: 100%;
    padding-bottom: 100%;
    background-position: center;
}
</style>