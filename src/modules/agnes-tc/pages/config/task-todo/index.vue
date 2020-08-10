<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="任务场景">
                    <el-date-picker
                        v-model="queryArgs.createData"
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
                    'createData':''
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'createData':''
                };
            },
            viewTask(params) {
                const row = params.data;
                if (row.taskType === '01'||row.taskType === '1') {
                    let kpiCode = row.taskKey;
                    let bizDate = row.bizDt;
                    let caseId = row.caseId;
                    let stepCode = row.stepCode;
                    this.$drawerPage.create({
                        width: 'calc(97% - 215px)',
                        title: ['指标任务详情'],
                        component: KpiDef,
                        args: {kpiCode, bizDate, caseId, stepCode,type:'todo'},
                        okButtonTitle: '重新执行',
                        cancelButtonTitle: '取消',
                        extendButtonVisible:true,
                        extendButtonTitle:'强制通过'
                    });
                }else if(row.taskType === '06'||row.taskType === '6'){
                    let kpiCode = row.taskKey;
                    let bizDate = row.bizDt;
                    let caseId = row.caseId;
                    let stepCode = row.stepCode;
                    this.$drawerPage.create({
                        width: 'calc(97% - 215px)',
                        title: ['人工任务详情'],
                        component: PersonTaskDetail,
                        args: {kpiCode, bizDate, caseId, stepCode,type:'todo'},
                        okButtonTitle: '保存',
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