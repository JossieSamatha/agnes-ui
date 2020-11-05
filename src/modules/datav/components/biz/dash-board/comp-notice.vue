<template>
    <div>
        <div v-for="(item, index) in msgDemoArr"
            :key="index" class="notice-list"
        >
            <div class="state-icon">
                <img :src="getImgPath(item.msgName)" alt="notice-img">
            </div>
            <div class="notice-state">
                {{item.msgTitle}}
            </div>
            <div class="notice-date">
                {{getNoticeDate(item.remindTime)}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-common",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                msgDemoArr: []
            }
        },
        created(){
            this.$api.ruleTableApi.getRemindList().then(res => {
                this.msgDemoArr = res.data.rows
            })
        },
        methods: {
            getImgPath(val) {
                if (val.includes("完成")) {
                    return require("../../../assets/done.png")
                } else
                if (val.includes("超时")) {
                    return require("../../../assets/overtime.png")
                } else
                if (val.includes("提醒")) {
                    return require("../../../assets/clock.png")
                }
            },

            getNoticeDate(noticeTime){
                return noticeTime ? noticeTime.slice(5,11) : '';
            }
        }
    }
</script>

<style scoped>
    .notice-list {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 15px;
      border-bottom: 1px dashed #eaeaea;
    }
    .state-icon,
    .notice-date,
    .notice-state {
        font-size: 12px;
    }
    .state-icon {
        margin-right: 10px;
    }
    .notice-state {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #666;
        flex: 1;
    }
    .notice-date {
        width: 55px;
        padding: 0 10px;
        color: #999;
    }
</style>
