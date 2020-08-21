<template>
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
            <gf-grid :query-args="queryArgs" @row-double-click="viewTask" grid-no="agnes-task-todo" ref="grid">

            </gf-grid>
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
                }
            }
        },
        mounted() {
            this.getChangeData();
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
            showTask(params,action) {
                const row = params.data;
                    if (row.taskType === '01'||row.taskType === '1') {
                        let customOpBtn = [];
                        if(row.allowManualConfirm && row.allowManualConfirm === '1'){
                            customOpBtn=  [
                                {title:'强制通过',className:'primary',action:'onExtendButton'},
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
                            args: {row,type:'todo',action},
                            customOpBtn:customOpBtn,
                            okButtonTitle: '重新执行',
                            cancelButtonTitle: '取消',
                            extendButtonVisible:true,
                            extendButtonTitle:'强制通过'
                        });
                    }else if(row.taskType === '06'||row.taskType === '6'){
                        this.$drawerPage.create({
                            width: 'calc(97% - 215px)',
                            title: [row.stepName + '-办理'],
                            component: PersonTaskDetail,
                            args: {row,type:'todo',action},
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
            }
        }
</script>
