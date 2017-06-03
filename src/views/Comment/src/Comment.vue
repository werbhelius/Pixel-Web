<template lang="html">
    <div class="comment">
            <div class="comment-header">
                <img class="comment-header-avatar"  v-if="comment.user" :src="comment.user.avatar_large">
            </div>
            <div class="comment-content">
                <div class="comment-user">
                    <h3 class="user-name" v-if="comment.user">{{comment.user.name}}</h3>
                    <span class="user-time">{{formatTime(comment.created_at)}}</span>
                </div>
                <div class="comment-text">
                     <span class="content-text" v-html="formatContent(comment.text)"></span>
                </div>
            </div>
        </div>
</template>
 
<script>
import * as DateUtils from '../../../utils/date-utils'
import * as StringUtils from '../../../utils/string-utils'

export default {
    name: "pixel-comment",
    props: [
        'comment'
    ],
    data() {
        return {
        };
    },
    methods: {
        formatTime(time) {
            return DateUtils.format(time);
        },
        formatContent(content) {
            return StringUtils.formatContent(content)
        },
    }
}
</script>
 
<style lang="css">

.comment {
    width: 100%;
    background: #FFFFFF;
    display: flex;
    flex-flow: row;
    padding-bottom: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, .03);
}

.comment .comment-header {
    width: 3rem;
    height: 3rem;
    margin: 1rem;
}

.comment .comment-header .comment-header-avatar {
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .05);
}

.comment .comment-content {
    flex: 1;
    display: flex;
    flex-flow: column;
}

.comment .comment-content .comment-user {
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-flow: column;
}

.comment .comment-content .comment-user .user-name {
    margin: 0;
    padding: 0;
    flex: 2;
    margin-top: 2px;
    font-size: 1.3rem;
    font-weight: 500;
}

.comment .comment-content .comment-user .user-time {
    margin: 0;
    padding: 0;
    flex: 1;
    font-size: 1rem;
    margin-top: -4px;
    color: #A4A8AC
}

.comment .comment-content .comment-text {
    flex: 1;
    margin-top: 1.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
}
</style>
