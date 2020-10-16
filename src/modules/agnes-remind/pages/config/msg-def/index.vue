<template>
    <div>
<!--        <gf-grid @row-double-click="showMsg" grid-no="agnes-msg-type" ref="grid" toolbar="find,refresh,more">-->
<!--            <template slot="left">-->
<!--                <gf-button class="action-btn" @click="batchRead" size="mini">批量读取</gf-button>-->
<!--            </template>-->
<!--        </gf-grid>-->
        <div class="option-panel">
            <span>
                <gf-button class="action-btn" @click="batchRead" size="mini">批量读取</gf-button>
                <gf-button class="action-btn" size="mini">全选</gf-button>
            </span>
        </div>
        <div class="container">
            <div class="task-container" v-for="(item, index) in msgDemoArr" :key="index">
                <el-checkbox v-model="checkbox" checked class="task-type">
                    {{item.msgTitle}}
                </el-checkbox>
                <span class="msg-time">{{item.crtTs}}</span>
                <div class="task-content">
                    {{item.msgDetail}}
                </div>
                <div :class="setClassName(item.hasRead)">
                    {{item.hasRead | showMsgState}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loadsh from'lodash';
    export default {
        data () {
            return {
                msgDemoArr: []
            }
        },
        // crtTs: "2020-09-25 15:33:29"
        // crtUser: "guest"
        // hasRead: "1"
        // hasSend: "0"
        // isDel: "0"
        // msgDetail: "【直销中心】申请数据导出发送（华安TA、中登上海、中登深圳、创新TA逐个发送）-超时通知"
        // msgId: "1f0o605v1fqc0"
        // msgTitle: "【直销中心】申请数据导出发送（华安TA、中登上海、中登深圳、创新TA逐个发送）-超时通知"
        // pkId: "1f0o6062gmvbk"
        // remindTime: "2020-09-25 15:33:29"
        // remindType: "1"
        // sendUser: "agnes"
        // updateTs: "2020-09-27 16:11:10"
        // updateUser: "agnes"
        mounted() {
            this.$api.ruleTableApi.getRemindList().then(res => {
                this.msgDemoArr = res.data.rows
            })
        },
        filters: {
            showMsgState(val) {
                if (val === '1') {
                    return '已读'
                }
                if (val === '0') {
                    return '未读'
                }
             }
        },
        methods: {
             async batchRead() {
                let data = this.$refs.grid.getSelectedRows();
                if (loadsh.isEmpty(data)){
                    this.$msg.success('请选择一条记录');
                    return;
                }
                let t =0;
                 for (let i=0;i<data.length;i++){
                   if (data[i].hasRead=="1"){
                      t+=1;
                   }
                 }
                 if (t!=0){
                     this.$msg.success('选中有'+t+'条已读数据');
                     return;
                 }
                 await this.$api.MsgApi.batchRead(data);
                 await this.$refs.grid.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            setClassName(val) {
                if (val === "1") {
                    return "task-state-done"
                }
                // if (val === "0") {
                //     return "task-state-clock"
                // }
                if (val === "0") {
                    return "task-state-overtime"
                }
            }
        },
    }
</script>

<style scoped>
    .container {
        height: calc(100% - 55px);
        flex: 1;
        overflow-y: auto;
    }

    .task-container {
        width: 95%;
        height: 106px;
        background: #FFFFFF;
        border: 1px solid #E5E7E9;
        border-radius: 4px;
        margin-left: 20px;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
    }
    .task-type {
        margin-left: 40px;
        margin-top: 15px;
        color: #333;
        font-size: 12px;
    }
    .task-content {
        margin-left: 40px;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #656565;
        font-size: 12px;
    }
    .task-state-done,
    .task-state-overtime,
    .task-state-clock {
        position: absolute;
        height: 18px;
        line-height: 18px;
        text-align: center;
        width: 70px;
        color: #fff;
        transform: rotate(45deg);
        right: -18px;
        top: 9px;
        font-size: 12px;
    }
    .task-state-done {
        background-color: #74c640;
    }
    .task-state-overtime {
        background-color: #e36a59;
    }
    .task-state-clock {
        background-color: #ffa920;
    }
    .msg-time {
        color: #999;
        font-size: 12px;
        position: absolute;
        right: 50px;
        top: 20px;
    }

    .el-button--mini, .el-button--mini.is-round {
        margin-left: 20px;
        margin-bottom: 15px;
    }
</style>
