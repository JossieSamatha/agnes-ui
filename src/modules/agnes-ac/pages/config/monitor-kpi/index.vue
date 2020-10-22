<template>
    <div class="monitor-kpi-page">
        <div class="tool-panel">
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
        </div>
        <div class="content" style="height: calc(100% - 30px)">
            <el-table class="kpi-grid" :data="kpiData" stripe height="100%" style="width: 100%">
                <el-table-column label="操作" width="100" :fit="false" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-popover class="icon-popper" placement="bottom"
                                    title="备注"
                                    width="300"
                                    trigger="click">
                            <el-input type="textarea" :rows="1" placeholder="请输入备注内容" v-model="remark">
                            </el-input>
                            <div style="text-align: right; margin-top: 10px">
                                <el-button class="op-btn primary" size="mini" @click="executeKpi">提交</el-button>
                            </div>
                            <el-button slot="reference" size="mini" type="text" @click="popoverClick(scope.row)" title="强制通过">
                                <span class="svgSpan" v-html="svgImg.actionConfirm"></span>
                            </el-button>
                        </el-popover>
                        <el-popover class="icon-popper" placement="bottom"
                                    title="备注"
                                    width="300"
                                    trigger="click">
                            <el-input type="textarea" :rows="1" placeholder="请输入备注内容" v-model="remark">
                            </el-input>
                            <div style="text-align: right; margin-top: 10px">
                                <el-button class="op-btn primary" size="mini" @click="executeKpi">提交</el-button>
                            </div>
                            <el-button slot="reference" size="mini" type="text" @click="exeTaskJob(scope.row)" title="重新执行">
                                <span class="svgSpan" v-html="svgImg.reExecute"></span>
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="KPI_NAME" label="指标名称" header-align="center">
                    <template slot-scope="scope">
                        <span class="kpi-level" v-if="scope.row.KPI_LEVEL">
                            <i class="fa fa-star" style="color: #f5222e" v-for="i in Number(scope.row.KPI_LEVEL)" :key="i"></i>
                        </span>
                        <span>{{scope.row.KPI_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="KPI_VALUE" label="异常" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: red"></i>
                        <a class="link-num" v-if="scope.row.KPI_VALUE!==0 && !scope.row.KPI_VALUE">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 1)">{{scope.row.KPI_VALUE}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="KPI_MANUAL_TAG" label="人工" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: #bba350"></i>
                        <a class="link-num" v-if="scope.row.KPI_MANUAL_TAG !==0 && !scope.row.KPI_MANUAL_TAG">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 2)">{{scope.row.KPI_MANUAL_TAG}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="F_KPI_VALUE" label="正常" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <i class="circle-icon fa fa-circle" style="color: green"></i>
                        <a class="link-num" v-if="scope.row.F_KPI_VALUE !==0 && !scope.row.F_KPI_VALUE">--</a>
                        <a class="link-num" v-else @click="showKpiDetail(scope.row, 0)">{{scope.row.F_KPI_VALUE}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="TARGET_NUM" label="目标值" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.TARGET_NUM">{{scope.row.TARGET_NUM}}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column prop="KPI_TOTAL" label="最后更新时间">
                    <template slot-scope="scope">
                        <span v-if="scope.row.LAST_MODIFY">{{scope.row.LAST_MODIFY}}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import mockData from "./mockData";
    import detailPage from './detail-page'
    export default {
        data() {
            return {
                svgImg: this.$lcImg,
                bizDate: window.bizDate,
                kpiData: mockData().data,

                remark: '',
                popoverVisible: false,
            }
        },
        methods: {
            // 业务日期切换
            bizDateChange(val){
                console.log(val);
            },

            // 强制通过
            executeKpi(row) {
                row
            },

            popoverClick(){
                this.popoverVisible = true;
            },

            // 重新执行
            exeTaskJob(){

            },

            // 显示KPI详情
            showKpiDetail(row, status) {
                const statusObj = {0: '正常', 1: '异常', 2: '人工'};
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(97% - 215px)',
                    title: [`${row.KPI_NAME}-${statusObj[status]}`],
                    component: detailPage,
                    args: {kpiCode: row.KPI_CODE, bizDate: this.bizDate, status},
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