<template>
    <div>
        <div v-for="(item, index) in msgDemoArr" :key="index" class="notice-list"
        >
            <svg-icon name="voice" height="12px" :color="index === 0 ? '#0F5EFF'  : '#ccc'"></svg-icon>
            <div class="notice-info"
                 :class="[item.expand]"
                 :style="{color: index === 0 ? '#666'  : '#ccc'}"
                 @dblclick="expandMore(item)"
            >
                {{item.remindTime}}-{{item.msgTitle}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                lcImg: this.$lcImg,
                msgDemoArr: []
            }
        },
        created(){
            // this.$api.ruleTableApi.getRemindList().then(res => {
            //     this.msgDemoArr = res.data.rows
            // })
            this.initData();
        },

        methods: {
            async initData(){
                let resp1 = await this.$api.HomePageApi.getMsgListByUser();
                if(resp1){
                    this.msgDemoArr = resp1.data;
                }
            },
            expandMore(item) {
                if (!item.expand) {
                    this.$set(item, 'expand', 'expand');
                } else {
                    item.expand = '';
                }
            }
        },
    }
</script>

<style scoped>
    .notice-list {
        display: flex;
        width: 100%;
    }

    .notice-list+.notice-list {
        margin-top: 12px;
    }

    .svg-icon {
        margin: 2px 6px 0 0;
    }

    .notice-info {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 12px;
        line-height: 20px;
    }

    .notice-info.expand {
        -webkit-line-clamp: inherit;
    }
</style>
