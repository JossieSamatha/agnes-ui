<template>
    <div class="monitor-kpi-page">
        <gf-grid ref="kpiGrid"
                 class="kpi-grid"
                 height="100%"
                 grid-no="kpi-list-def"
                 :query-args="queryParam"
                 :options="kpiGridOption(this)"
        >
            <template slot="left">
                <span style="margin-right: 10px">业务日期</span>
                <el-date-picker v-model="bizDate"
                                type="date"
                                size="mini"
                                align="center"
                                :clearable="false"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                style="width: 175px"
                                @change="bizDateChange"
                >
                </el-date-picker>
            </template>
        </gf-grid>
        </div>
</template>

<script>
    import detailPage from './detail-page'
    export default {
        data() {
            return {
                bizDate: window.bizDate,
                remark: '',
                taskCommit: {
                    inst: {
                        taskId: "",
                    },
                    stepInfo :{
                        remark: "",
                        caseId: "",
                        stepCode: ""
                    }
                },
                kpiGridOption: (_this)=>{
                    return {
                        onCellClicked(params) {
                            const showDetailArr = ['doneNum', 'errNum', 'manualNum'];
                            if(showDetailArr.includes(params.colDef.field) && params.value > 0){
                                _this.showKpiDetail(params.data, showDetailArr.indexOf(params.colDef.field))
                            }
                        },
                        onFirstDataRendered(params){
                            params.columnApi.columnController.autoSizeFitColumns();
                        }
                    }
                },
                queryParam: {
                    bizDate: window.bizDate
                }
            }
        },
        watch: {
            bizDate(val){
                if(this.$refs.kpiGrid && this.$refs.kpiGrid.gridController.columnApi){
                    if(val !== window.bizDate){
                        this.$refs.kpiGrid.gridController.columnApi.setColumnsVisible(['option'], false);
                    }else{
                        this.$refs.kpiGrid.gridController.columnApi.setColumnsVisible(['option'], true);
                    }
                }
            }
        },
        methods: {
            // 业务日期切换
            bizDateChange(val){
                this.queryParam.bizDate = val;
                this.$refs.kpiGrid.reloadData();
            },

            // 强制通过
            async executeKpi(row) {
                this.taskCommit.inst.taskId = row.data.taskId;
                this.taskCommit.stepInfo.caseId = row.data.caseId;
                this.taskCommit.stepInfo.stepCode = row.data.kpiCode;
                this.taskCommit.stepInfo.remark = row.data.remark;
                this.taskCommit.stepInfo.stepStatus = "07";
                this.taskCommit.stepInfo.jobId = row.data.jobId;
                this.taskCommit.stepInfo.bizDate = this.bizDate;
                try {
                    const resp = await this.$api.taskTodoApi.confirmKpiTask(this.taskCommit);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.bizDateChange(this.bizDate);
                        this.$msg.success('提交成功');
                    } else {
                        this.$msg.error('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 重新执行
            exeTaskJob(row){
                let kpiTaskReq = {}
                kpiTaskReq.caseId = row.data.caseId;
                kpiTaskReq.stepCode = row.data.kpiCode;
                kpiTaskReq.bizDate = this.bizDate;
                kpiTaskReq.taskId = row.data.taskId;
                this.$api.kpiDefineApi.execTask(kpiTaskReq).then((resp) => {
                    if(resp.data.status){
                        this.$msg.success("重新执行成功");
                        this.bizDateChange(this.bizDate);
                    } else{
                        this.$msg.error("操作失败");
                    }
                });
            },

            // 显示KPI详情
            showKpiDetail(row, status) {
                const statusObj = {0: '正常', 1: '异常', 2: '干预通过'};
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(97% - 215px)',
                    title: [`${row.taskName}-${statusObj[status]}`],
                    component: detailPage,
                    args: {kpiCode: row.kpiCode, bizDate: this.bizDate, status},
                    cancelButtonTitle: '返回',
                    okButtonVisible: false
                });
            },
        }
    }
</script>

<style>
    .svg-btn.el-button.is-disabled .lcSvg.theme-color .cls-1{
        fill: #ccc;
    }

    .monitor-kpi-page.gf-tab-view .el-loading-mask{
        z-index: inherit;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .kpi-grid .gf-ag-grid.ag-theme-balham .star-cell .fa.fa-star,
    .kpi-grid .gf-ag-grid.ag-theme-balham .status-circle-cell.red-cell {
        color: #f5222e;
    }

    .kpi-grid .gf-ag-grid.ag-theme-balham .status-circle-cell.yellow-cell{
        color: #bba350;
    }

    .kpi-grid .gf-ag-grid.ag-theme-balham .status-circle-cell.green-cell{
        color: green;
    }

    .kpi-grid .gf-ag-grid.ag-theme-balham .status-circle-cell:hover .ag-cell-value{
        color: inherit;
        text-decoration: underline;
        cursor: pointer;
    }
</style>