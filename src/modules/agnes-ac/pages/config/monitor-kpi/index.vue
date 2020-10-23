<template>
    <div class="monitor-kpi-page" style="padding: 20px">
        <div class="option-panel">
            <span>指标监控看板列表</span>
            <span>
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
            </span>
        </div>
        <div class="content" style="height: calc(100% - 30px)">
            <el-table class="kpi-grid" :data="kpiData" stripe height="100%" style="width: 100%">
                <el-table-column label="操作" width="100" :fit="false" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-popover class="icon-popper" placement="bottom-start"
                                    title="备注"
                                    width="300"
                                    trigger="click">
                            <el-input type="textarea" :rows="1" placeholder="请输入备注内容" v-model="remark">
                            </el-input>
                            <div style="text-align: right; margin-top: 10px">
                                <el-button class="op-btn primary" size="mini" @click="executeKpi">提交</el-button>
                            </div>
                            <el-button slot="reference" size="mini" type="text" @click="popoverClick(scope.row)" title="干预通过">
                                <span class="svgSpan" v-html="svgImg.forcePass"></span>
                            </el-button>
                        </el-popover>

                        <el-button  class="icon-popper" size="mini" type="text" @click="exeTaskJob(scope.row)" title="重新执行">
                            <span class="svgSpan" v-html="svgImg.reExecute"></span>
                        </el-button>

                    </template>
                </el-table-column>
                <el-table-column prop="taskName" label="指标名称">
                    <template slot-scope="scope">
                        <span class="kpi-level" v-if="scope.row.stepLevel">
                            <i class="fa fa-star" style="color: #f5222e" v-for="i in Number(scope.row.stepLevel)" :key="i"></i>
                        </span>
                        <span>{{scope.row.taskName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="errNum" label="异常" width="120">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: red"></i>
                        <a class="link-num" v-if="scope.row.errNum!==0 && !scope.row.errNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 1)">{{scope.row.errNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="manualNum" label="人工" width="120">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: #bba350"></i>
                        <a class="link-num" v-if="scope.row.manualNum !==0 && !scope.row.manualNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 2)">{{scope.row.manualNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="doneNum" label="正常" width="120">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: green"></i>
                        <a class="link-num" v-if="scope.row.doneNum !==0 && !scope.row.doneNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 0)">{{scope.row.doneNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="targetName" label="目标值" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.targetName">{{scope.row.targetName}}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column prop="execStartTime" label="最后更新时间">
                    <template slot-scope="scope">
                        <span v-if="scope.row.execStartTime">{{formatDate(scope.row.execStartTime)}}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import detailPage from './detail-page'
    export default {
        data() {
            return {
                svgImg: this.$lcImg,
                bizDate: window.bizDate,
                kpiData: [],

                remark: '',
                popoverVisible: false,
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
            }
        },
        mounted() {
             this.init(this.bizDate);
        },
        methods: {
            formatDate(dt){
                return this.$dateUtils.formatDate(dt, 'yyyy-MM-dd HH:mm:ss');
            },


            async init(bizDate){
                const resp = await this.$api.monitorKpiApi.getMonitorkpiList(bizDate);
                this.kpiData = resp.data;
            },
            // 业务日期切换
            bizDateChange(val){
                this.init(val)
            },

            // 强制通过
            async executeKpi(row) {
                this.taskCommit.inst.taskId = row.taskId;
                this.taskCommit.stepInfo.caseId = row.caseId;
                this.taskCommit.stepInfo.stepCode = row.kpiCode;
                this.taskCommit.stepInfo.remark = this.remark;
                this.taskCommit.stepInfo.stepStatus = "07";
                this.taskCommit.stepInfo.jobId = row.jobId;
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(this.taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            popoverClick(){
                this.popoverVisible = true;
            },

            // 重新执行
            exeTaskJob(row){
                let _this=this;
                let kpiTaskReq = {}
                kpiTaskReq.caseId = row.caseId;
                kpiTaskReq.stepCode = row.kpiCode;
                kpiTaskReq.bizDate = this.bizDate;
                kpiTaskReq.taskId = row.taskId;
                this.$api.kpiDefineApi.execTask(kpiTaskReq).then((resp) => {
                    if(resp.status){
                        _this.$message.success(resp.message);
                        _this.reloadData();
                    } else{
                        _this.$message.error(resp.message);
                    }
                });
            },

            // 显示KPI详情
            showKpiDetail(row, status) {
                const statusObj = {0: '正常', 1: '异常', 2: '人工'};
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
    .kpi-grid .el-table__header th{
        color: #333;
        font-weight: normal;
    }

    .kpi-grid tr.el-table__row td {
        padding: 4px 0px;
        border: none;
        color: #666;
    }
</style>

<style scoped>
    .svgSpan {
        display: inline-block;
        width: 18px;
        height: 18px;
    }

    .circle-icon {
        margin-right: 10px;
    }

    .link-num {
        cursor: pointer;
    }

    .icon-popper+.icon-popper{
        margin-left: 8px;
    }
</style>