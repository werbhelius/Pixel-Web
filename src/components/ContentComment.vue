<template lang="html">
    <div class="content-comment">
        <div class="commentlist" v-for="comment in list">
            <pixel-comment :comment="comment"></pixel-comment>
        </div>
        <div class="refresh-footer" v-if="option.refresh">
            <pixel-spinner :size="'45px'" :color="'#007AFF'"></pixel-spinner>
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "content-comment",
    data() {
        return {
            list: []
        };
    },
    computed: {
        ...mapGetters({
            detail_content: 'detail_content',
            comments: 'comments',
            option: 'comments_option'
        })
    },
    watch: {
        option: {
            handler: function (val, oldVal) {
                if (val && val.page == 1) {
                    this.list = []
                }
            },
            deep: true
        },
        comments: function (val, oldVal) {
            if (val) {
                if (this.option.page == 1) {
                    this.list = val;
                } else {
                    this.list = [...this.list, ...val]
                }
            }
        }
    },
    created() {
        this.contentComments(1)
        window.addEventListener('scroll', this.scrollBar)
    },
    activated() {
        this.contentComments(1)
        window.addEventListener('scroll', this.scrollBar)
    },
    deactivated() {
        window.removeEventListener('scroll', this.scrollBar)
    },
    methods: {
        ...mapActions([
            'getContentComments'
        ]),
        formatNum(num) {
            return StringUtils.formatNum(num)
        },
        contentComments(page) {
            this.getContentComments(
                {
                    id: this.detail_content.id,
                    page: page
                }
            )
        },
        loadMore() {
            let vue = this
            vue.option.refresh = true
            var page = vue.option.page + 1
            vue.contentComments(page)
        },
        scrollBar() {
            var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
            var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
            if (a + b == c) {
                this.loadMore()
            }
        }
    }
}
</script>
 
<style lang="css">
.content-comment .commentlist {
    flex: 1;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

.content-comment .refresh-footer {
    margin-bottom: .8rem;
    margin-top: .8rem;
    text-align: center;
}
</style>
