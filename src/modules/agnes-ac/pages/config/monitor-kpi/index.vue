<template>
    <div class="monitor-kpi-page" v-loading="loading">
        <div class="option-panel">
            <span></span>
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
                <em class="el-icon-refresh" title="全部刷新" @click="init(bizDate)"></em>
            </span>
        </div>
        <div class="content" style="height: calc(100% - 30px)">
            <el-table class="kpi-grid" :data="kpiData" stripe height="100%" style="width: 100%">
                <el-table-column label="操作" width="100" :fit="false" header-align="center" align="center" v-if="optionColShow">
                    <template slot-scope="scope">
                        <el-popover class="icon-popper" placement="bottom-start"
                                    title="备注"
                                    width="300"
                                    trigger="click">
                            <el-input type="textarea" :rows="1" placeholder="请输入备注内容" v-model="remark">
                            </el-input>
                            <div style="text-align: right; margin-top: 10px">
                                <el-button class="op-btn primary" size="mini" @click="executeKpi(scope.row)">提交</el-button>
                            </div>
                            <el-button class="svg-btn" slot="reference" size="mini" type="text" :disabled="!(scope.row.stepStatus === '03' || scope.row.stepStatus === '04')" @click="popoverClick(scope.row)" title="干预通过">
                                <span class="svgSpan" v-html="svgImg.forcePass"></span>
                            </el-button>
                        </el-popover>

                        <el-button  class="icon-popper svg-btn" size="mini" type="text" :disabled="!(scope.row.stepStatus === '03' || scope.row.stepStatus === '04')" @click="exeTaskJob(scope.row)" title="重新执行">
                            <span class="svgSpan" v-html="svgImg.reExecute"></span>
                        </el-button>

                    </template>
                </el-table-column>
                <el-table-column prop="kpiCode" label="指标代码" width="100"></el-table-column>
                <el-table-column prop="taskName" label="指标名称">
                    <template slot-scope="scope">
                        <span class="kpi-level" v-if="scope.row.stepLevel">
                            <em class="fa fa-star" style="color: #f5222e" v-for="i in Number(scope.row.stepLevel)" :key="i"></em>
                        </span>
                        <span>{{scope.row.taskName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="errNum" label="异常" width="100">
                    <template slot-scope="scope">
                        <em class="circle-icon fa fa-circle" style="color: red"></em>
                        <a class="link-num" v-if="scope.row.errNum!==0 && !scope.row.errNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 1)">{{scope.row.errNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="manualNum" label="干预通过" width="100">
                    <template slot-scope="scope">
                        <em class="circle-icon fa fa-circle" style="color: #bba350"></em>
                        <a class="link-num" v-if="scope.row.manualNum !==0 && !scope.row.manualNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 2)">{{scope.row.manualNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="doneNum" label="正常" width="100">
                    <template slot-scope="scope">
                        <em class="circle-icon fa fa-circle" style="color: green"></em>
                        <a class="link-num" v-if="scope.row.doneNum !==0 && !scope.row.doneNum">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 0)">{{scope.row.doneNum}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="targetName" label="目标值" width="100">
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
                loading: false,
                remark: '',
                popoverVisible: false,
                optionColShow: true,
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
                this.loading = true;
                if(bizDate === window.bizDate){
                    this.optionColShow = true;
                }else{
                    this.optionColShow = false;
                }
                const resp = await this.$api.monitorKpiApi.getMonitorkpiList(bizDate);
                this.kpiData = resp.data;
                this.loading = false;
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
    .kpi-grid.el-table {
        border: 1px solid #ccc;
    }

    .kpi-grid .el-table__header th{
        color: #333;
        font-size: 13px;
        font-weight: normal;
        border-color: #ccc;
        background: #EAEDF1;
        padding: 6px 0;
    }

    .kpi-grid.el-table th.is-leaf {
        border-color: #ccc;
    }

    .kpi-grid tr.el-table__row td {
        padding: 0;
        border: none;
        color: #666;
        font-size: 12px;
    }
    .kpi-grid tr.el-table__row td {
        padding: 0;
        border: none;
        color: #666;
        font-size: 12px;
        height: 36px;
    }

    .svg-btn.el-button.is-disabled .lcSvg.theme-color .cls-1{
        fill: #ccc;
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

    .el-icon-refresh {
        font-size: 18px;
        color: #999;
        font-weight: bold;
        margin-left: 5px;
        line-height: 26px;
        cursor: pointer;
    }

    .el-icon-refresh:hover {
        color: #476DBE;
    }

    .monitor-kpi-page.gf-tab-view .el-loading-mask{
        z-index: inherit;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>