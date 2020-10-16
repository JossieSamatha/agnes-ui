<template>
<!--任务中心-->
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="发起时间">
                    <el-date-picker
                      v-model="queryArgs.taskStartTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
<!--        <gf-grid -->
<!--            :query-args="queryArgs" -->
<!--            @row-double-click="viewTask" -->
<!--            grid-no="agnes-task-todo" -->
<!--            ref="grid"-->
<!--        >-->
<!--        </gf-grid>-->
        <div class="container">
            <div class="task-container" v-for="(item, index) in taskDemoArr" :key="index">
                <div class="task-type">{{item.taskRemark}}</div>
                <div class="task-content">
                    {{item.taskName}}
                </div>
                <div class="task-execor">
                    <span>{{item.participants}}</span>
                    <span style="margin-left: 20px;">{{item.taskStartTm}}</span>
                    <span style="position: absolute;
                             right: 30px;
                             color: #476DBD;
                             cursor: pointer;"
                    >
                    去处理
                </span>
                </div>
                <div :class="setClassName(item.stepStatus)">
                    {{item.stepStatus | showTaskStatus}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import KpiDef from "../kpi-def/index"
    import TaskConfDlg from "./task-confirm-dlg"
    import PersonTaskDetail from "../person-task-detail"

    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'taskStartTime':''
                },
                taskDemoArr: []
            }
        },
        // allowManualConfirm: "0"
        // bizDt: "2020-09-29"
        // caseId: "20200929-172102-640"
        // jobId: "9901"
        // participants: "AGNES"
        // stepCode: "00101800"
        // stepName: "【分TA】中登确认文件收到"
        // stepStatus: "02"
        // taskId: "1f12pfccus0ly"
        // taskKey: "00101800"
        // taskName: "【分TA】中登确认文件收到[2020-09-29]-监控指标任务"
        // taskRemark: "【分TA】中登确认文件收到"
        // taskStartTm: "2020-09-29 17:21:49"
        // taskType: "1"
        mounted() {
            this.getChangeData();
            this.$api.ruleTableApi.getTaskTodoList().then(res => {
                this.taskDemoArr = res.data.rows
            })
        },
        filters: {
            showTaskStatus(val) {
                if (val === "01") {
                    return "未开始"
                }
                if (val === "02") {
                    return "执行中"
                }
                if (val === "03") {
                    return "有异常"
                }
                if (val === "04") {
                    return "已超时"
                }
                if (val === "05") {
                    return "已作废"
                }
                if (val === "06") {
                    return "已完成"
                }
                if (val === "07") {
                    return "人工强制关闭"
                }
            }
        },
        methods: {
            async getChangeData() {
                this.queryArgs.taskStartTime = window.bizDate;
                await this.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'taskStartTime':''
                };
                this.$refs.grid.reloadData();
            },
            viewTask(params){
                this.showTask(params,this.onViewTask.bind(this));
            },
            showTask(params,actionOk) {
                const row = params.data;
                    if (row.taskType === '01'||row.taskType === '1') {
                        let customOpBtn = [];
                        if(row.allowManualConfirm && row.allowManualConfirm === '1'){
                            customOpBtn=  [
                                {title:'干预通过',className:'primary',action:'onExtendButton'},
                                {title:'重新执行',className:'primary',action:'onSave'},
                                {title:'取消',action:'onCancel'},
                            ]
                        }else{
                            customOpBtn=  [
                                {title:'重新执行',className:'primary',action:'onSave'},
                                {title:'取消',action:'onCancel'},
                            ]
                        }
                        this.$drawerPage.create({
                            width: 'calc(97% - 215px)',
                            title: [row.stepName + '-办理'],
                            component: KpiDef,
                            args: {row,type:'todo',actionOk},
                            customOpBtn:customOpBtn,
                            okButtonTitle: '重新执行',
                            cancelButtonTitle: '取消',
                            extendButtonVisible:true,
                            extendButtonTitle:'干预通过'
                        });
                    }else if(row.taskType === '06'||row.taskType === '6'){
                        this.$drawerPage.create({
                            width: 'calc(97% - 215px)',
                            title: [row.stepName + '-办理'],
                            component: PersonTaskDetail,
                            args: {row,type:'todo',actionOk},
                            okButtonTitle: '提交',
                            cancelButtonTitle: '取消',
                        });
                    }
                },
            async onViewTask() {
                    this.reloadData();
                },
            confirmTask(params) {
                    const row = params.data;
                    let mode = 'edit';
                    let actionOk = this.onConfirmTask.bind(this);
                    if (row.taskType === '1') {
                        this.$nav.showDialog(
                            TaskConfDlg,
                            {
                                args: {row, mode, actionOk},
                                width: '35%',
                                title: this.$dialog.formatTitle('确认任务', mode)
                            }
                        );
                    }
                },
            async onConfirmTask() {
                    this.reloadData();
                },
            setClassName(val) {
                if (val === "06") {
                    return "task-state-done"
                }
                if (val === "01") {
                    return "task-state-start"
                }
                if (val === "04") {
                    return "task-state-overtime"
                }
                if (val === "02") {
                    return "task-state-exec"
                }
                if (val === "03" || val === "05" || val === "07") {
                    return "task-state-error"
                }
            }
        }
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
        height: 123px;
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
    .task-execor {
        height: 38px;
        border-top: 1px solid #cccccc;
        line-height: 38px;
        padding-left: 40px;
        margin-top: 15px;
        color: #999999;
        font-size: 12px;
        position: relative;
    }
    .task-state-done,
    .task-state-overtime,
    .task-state-start,
    .task-state-exec,
    .task-state-error {
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
    .task-state-done,
    .task-state-start,
    .task-state-exec {
        background-color: #6895f2;
    }
    .task-state-error,
    .task-state-overtime {
        background-color: #ea6461;
    }

    .el-form.search-panel {
        margin-bottom: 20px;
    }
</style>
