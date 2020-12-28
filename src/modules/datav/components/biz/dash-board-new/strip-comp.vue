<template>
    <div class="strip-comp-container">
        <div class="strip-comp" v-for="item in dataArr" :key="item.pkId">
            <span class="icon" :style="{background: msgTypeOp[item.msgType].color}">
                <svg-icon :name="item.msgType" width="12px" height="12px" color="#fff"></svg-icon>
            </span>
            <span class="info" :title="item.msgTitle">{{item.msgTitle}}</span>
            <span class="type">{{msgTypeOp[item.msgType].label}}</span>
            <span class="date-time">{{item.remindTime}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataArr: [],
                msgTypeOp: {
                    'AHEAD': {label: '提前通知', color: '#FFB727'},
                    'FINISHED': {label: '完成通知', color: '#4BE16E'},
                    'OVERTIME': {label: '超时通知', color: '#FFB727'},
                    'EXCEPTION': {label: '异常通知', color: '#F7603D'}
                },
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            async getData() {
                const resp = await this.$api.ruleTableApi.getMsgBoxList();
                this.dataArr = resp.data.splice(0,6);
            }
        },
    }
</script>

<style scoped>
    .strip-comp {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        border-radius: 4px;
        color: #333;
        font-size: 12px;
        background: #EFF3FC;
        padding: 0 32px 0 16px;
    }

    .strip-comp+.strip-comp {
        margin-top: 12px;
    }

    .strip-comp:first-child {
        color: #0F5EFF;
        border: 1px solid #0F5EFF;
        background: #BBD1FF;
    }

    .strip-comp:nth-child(4) {
        opacity: .8;
    }

    .strip-comp:nth-child(5) {
        opacity: .6;
    }

    .strip-comp:nth-child(6) {
        opacity: .4;
    }

    .strip-comp .icon {
        flex: none;
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        line-height: 20px;
        margin-right: 18px;
    }

    .strip-comp .icon .svg-icon {
        margin: auto;
    }

    .strip-comp .info {
        flex: 1;
        width: 100%;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .strip-comp .type {
        white-space: nowrap;
        margin-left: auto;
    }

    .strip-comp .date-time {
        white-space: nowrap;
        margin-left: 85px;
    }
</style>