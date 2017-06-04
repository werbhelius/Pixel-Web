<template lang="html">
    <div class="detail">
        <div class="detail-header">
            <div class="header-close" v-on:click="goBack">
                <svg viewBox="0 0 46 72" style="display: inline-block; fill: currentcolor; height: 100%; width: 100%; position: relative; user-select: none; vertical-align: text-bottom;"><g><path d="M40 33H15.243l7.878-7.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0l-13 13a2.998 2.998 0 0 0 0 4.242l13 13c.585.586 1.353.879 2.121.879s1.536-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L15.243 39H40a3 3 0 1 0 0-6z"></path></g></svg>
            </div>
            <span class="header-title">正文</span>
        </div>
        <div class="detail-content">
             <pixel-content :x="detail_content"></pixel-content>
        </div>
        <nav class="detail-switch-tab">
            <span class="detail-switch-tag" >评论</span>
            <span class="detail-switch-tag"></span>
             <span class="detail-switch-tag"></span>
        </nav>
        <div class="comment-list" v-for="comment in list">
            <pixel-comment :comment="comment"></pixel-comment>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
import * as StringUtils from '../utils/string-utils'
export default {
    name: "detail-content",
    data() {
        return {
            list: [],
            loading: true,
            page: 1
        };
    },
    computed: {
        ...mapGetters({
            detail_content: 'detail_content',
            comments: 'comments',
            refresh: 'comments_refresh'
        })
    },
    watch: {
        refresh: function (val) {
            if (val == true) {
                this.list = []
                this.page = 1
            }
        },
        comments: function (val, oldVal) {
            if (val) {
                if (this.page == 1) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                }
            }
        }
    },
    created() {
        setTimeout(() => {
            this.contentComments(this.page)
        }, 1500)
    },
    activated() {
        this.contentComments(this.page)
    },
    deactivated() {
        this.list = []
        this.page = 1
    },
    methods: {
        ...mapActions([
            'getContentComments'
        ]),
        formatNum(num) {
            return StringUtils.formatNum(num)
        },
        goBack() {
            this.$router.go(-1)
        },
        contentComments(page) {
            this.getContentComments(
                {
                    id: this.detail_content.id,
                    page: page
                }
            )
        }
    }
}
</script>
 
<style lang="css">
.detail {
    width: 100%;
    height: 100%;
}

.detail-header {
    width: 100%;
    height: 4rem;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    z-index: 150;
    overflow: auto;
    display: flex;
    flex-flow: row;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
}

.detail-header .header-close {
    color: #007AFF;
    width: 2rem;
    height: 2rem;
    margin: 1rem;
    z-index: 150;
}

.detail-header .header-title {
    height: 4rem;
    line-height: 4rem;
    margin-left: 1rem;
    font-weight: 800;
    color: #5d5d5d;
}

.detail-content {
    margin-top: 4rem;
    background-color: #ffffff;
    padding: 1rem;
}

.detail-switch-tab {
    width: 100%;
    height: 3.8rem;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, .05);
    display: flex;
    flex-flow: row;
}

.detail-switch-tab .detail-switch-tag {
    padding-left: 1rem;
    font-weight: 600;
    line-height: 3.8rem;
    color: #007AFF;
    font-size: 1.3rem;
    border-bottom: 2px solid #007AFF;
}

.detail-switch-tab .detail-num {
    font-weight: 400;
    color: #007AFF;
    font-size: 1rem;
    margin-left: .3rem;
}

.comment-list {
    box-shadow: 1px rgba(0, 0, 0, .05);
}
</style>