<template lang="html">
    <div class="at_comment">
        <div class="comment-header" v-if="comment.user" >
            <img class="comment-header-avatar"  :src="comment.user.avatar_large">
        </div>
        <div class="comment-content">
            <div class="comment-user" v-if="comment.user">
                <h3 class="user-name" >{{comment.user.name}}</h3>
                <span class="user-time">{{formatTime(comment.created_at)}}</span>
            </div>
            <div class="comment-text">
                <span class="content-text" v-html="formatContent(comment.text)"></span>
            </div>
            <div class="my-comment" v-if="comment.reply_comment">
                <span class="my-comment-text">{{formatMyComment(comment.reply_comment)}}</span>
            </div>
            <div class="comment-status" v-if="comment.status" v-on:click="goDetailContent" >
                <div class="status-img">
                    <img class="comment-header-avatar"  :src="comment.status.user.avatar_large">
                </div>
                <div class="status-comtent">
                    <h3 class="user-name" v-html="formatContent( '@' + comment.status.user.name)" ></h3>
                    <span class="user-status"  v-html="formatContent(comment.status.text)"></span>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import * as DateUtils from '../../../utils/date-utils'
import * as StringUtils from '../../../utils/string-utils'
import { mapActions } from 'vuex'

export default {
    name: "pixel-at-me-comment",
    props: [
        'comment'
    ],
    data() {
        return {
        };
    },
    methods: {
         ...mapActions([
            'setDetailContent'
        ]),
        goDetailContent() {
            this.setDetailContent(this.comment.status)
            this.$router.push({name : 'detail-content'})
        },
        formatTime(time) {
            return DateUtils.format(time);
        },
        formatContent(content) {
            return StringUtils.formatContent(content)
        },
        formatMyComment(content) {
            return '@' + content.user.name + ':' + content.text
        },
    }
}
</script>
 
<style lang="css">

.at_comment {
    display: flex;
    flex-flow: row;
}

.at_comment .comment-header {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
}

.at_comment .comment-header .comment-header-avatar {
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .05);
}

.at_comment .comment-content {
    flex: 1;
    display: flex;
    flex-flow: column;
}

.at_comment .comment-content .comment-user {
    width: 100%;
    height: 2rem;
    display: flex;
    flex-flow: row;
}

.at_comment .comment-content .comment-user .user-name {
    margin: 0;
    padding: 0;
    flex: 2;
    font-size: 1.3rem;
    font-weight: 500;
}

.at_comment .comment-content .comment-user .user-time {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    color: #A4A8AC
}

.at_comment .comment-content .comment-text {
    flex: 1;
    font-size: 1rem;
    line-height: 1.5rem;
}

.at_comment .comment-content .my-comment {
    padding-top: .3rem;
}

.at_comment .comment-content .my-comment .my-comment-text{
    margin: 0;
    padding: 0;
    font-size: 1rem;
    color: #A4A8AC;
    overflow: hidden;
    text-overflow: ellipsis;
}

.at_comment .comment-content .comment-status {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 5rem;
    margin-top: .8rem;
    background-color: #f5f5f5;
}

.at_comment .comment-content .comment-status .status-img{
    width: 5rem;
    height: 5rem;
    border: 1px solid #f5f5f5;
}

.at_comment .comment-content .comment-status .status-comtent {
    margin-left: .5rem;
    margin-right: .5rem;
    display: flex;
    flex-flow: column;
    flex: 1;
}

.at_comment .comment-content .comment-status .status-comtent .user-name {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 500;
}

.at_comment .comment-content .comment-status .status-comtent .user-status {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    color: #A4A8AC;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
