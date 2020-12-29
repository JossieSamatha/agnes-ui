<template>
    <div class="table-pie">
        <div>
            <el-table class="el-table-grid task-table" :data="taskArr"
                      max-height="300">
                <el-table-column v-for="tableCol in tableHeader"
                                 :key="tableCol.key"
                                 :prop="tableCol.key"
                                 :label="tableCol.label"
                                 :width="tableCol.width ? tableCol.width : null"
                >
                    <template slot-scope="scope">
                        <span v-if="tableCol.key === 'taskCategory'">
                            {{getDictName(scope.row.taskCategory)}}
                        </span>
                        <span :style="{color: tableCol.color}" v-else>{{scope.row[tableCol.key]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pie-chart">
            <div ref="pieCharts" style="width: 100%;height: 100%"></div>
            <div class="legend">
                <p class="rec-legend">
                    <span v-for="(rect, index) in legendRec" :key="index">
                        <em class="rect-block" :style="{background: rect.color}"
                        ></em>{{rect.label}}
                    </span>
                </p>
                <p class="cir-legend">
                    <span v-for="(cir, index) in legendCir" :key="index">
                        <em class="fa fa-circle" :style="{color: cir.color}"
                        ></em>{{cir.label}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                statusColor: ['#FCA06A','#56DF9A','#56BFDF'],
                tableHeader: [
                    {label: '任务类型', key: 'taskCategory'},
                    {label: '已完成', key: 'doneNum', width: 70, color: '#1DBE28'},
                    {label: '未完成', key: 'undoneNum', width: 70, color: '#7A86CD'},
                    {label: '目标数', key: 'targetNum', width: 70, color: '#0F5EFF'}
                ],
                taskArr: [],
                legendRec: [{label: '人工', color: '#56BFDF'}, {label: '自动', color: '#56DF9A'}, {label: '指标', color: '#FCA06A'}],
                legendCir: [{label: '已完成', color: '#4C6CFF'}, {label: '未完成', color: '#C9CDE3'}],
                pieChart: {},
                pieOptions: {
                    tooltip: {
                        show: false
                    },
                    series: [
                        {
                            name: '任务类型',
                            type: 'pie',
                            radius: [0, '40%'],
                            center: ['60%', '50%'],
                            hoverAnimation:false,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal:{
                                    color: (param)=>{
                                        return this.statusColor[param.dataIndex];
                                    }
                                }
                            },
                            data: [
                                {value: 100, name: '人工'},
                                {value: 100, name: '自动'},
                                {value: 100, name: '指标'}
                            ]
                        },
                        {
                            name: '完成情况',
                            type: 'pie',
                            radius: ['60%', '80%'],
                            center: ['60%', '50%'],
                            hoverAnimation:false,
                            label: {
                                show: true,
                                padding:[0,-25],
                                formatter: function(params){
                                    if(params.dataIndex%2 === 0){
                                        return '[已完成]\n'+params.value+'%';
                                    }else{
                                        return '';
                                    }
                                },
                                fontSize: 14,
                                lineHeight: 18,
                                color: '#0F5EFF',
                                distanceToLabelLine: -10,
                            },
                            labelLine: {
                                show: false,
                            },

                            itemStyle: {
                                normal:{
                                    color: function(param){
                                        return ['#4C6CFF','#C9CDE3'][param.dataIndex%2];
                                    }
                                }
                            },
                            data: [
                                {value: 50, name: '已完成'},
                                {value: 50, name: '未完成'},
                                {value: 78, name: '已完成'},
                                {value: 22, name: '未完成'},
                                {value: 82, name: '已完成'},
                                {value: 18, name: '未完成'},
                            ]
                        }
                    ]
                }
            }
        },

        mounted() {
            this.init();
        },
        methods: {
            async init() {
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                this.exeTime = resChangeData.bizDate;
                let resp1 = await this.$api.HomePageApi.selectCaseStepOfToday(this.exeTime);
                if(resp1){
                    this.taskArr = resp1.data;
                }
                this.pieChart = this.echarts.init(this.$refs.pieCharts);
                this.pieChart.setOption(this.pieOptions);
                this.pieChart.resize();
                window.addEventListener('resize', () => {
                    this.pieChart.resize()
                });
            },
            getDictName(item){
                return this.$app.dict.getDictItem("AGNES_TASK_TYPE",item).dictName;
            }
        }
    }
</script>

<style scoped>
    .table-pie {
        display: flex;
        height: 100%;
    }

    .table-pie>div {
        position: relative;
        flex: 1;
    }

    .pie-chart {
        margin-left: 40px;
    }

    .legend {
        display: flex;
        align-items: flex-end;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .legend>p {
        display: inline-flex;
        flex-direction: column;
    }

    .legend>p+p {
        margin-left: 15px;
    }

    .legend .rect-block {
        display: inline-block;
        width: 12px;
        height: 10px;
        border-radius: 2px;
    }

    .legend>p>span {
        color: #666;
        font-size: 12px;
    }

    .legend>p>span>em {
        margin-right: 6px;
    }
</style>

<style>
    .el-table-grid.el-table.task-table {
        width: 100%;
        min-width: 320px;
        border-radius: 8px;
    }

    .el-table-grid.task-table .el-table__header th {
        font-weight: bold;
    }

    .el-table-grid.task-table .el-table__header th,
    .el-table-grid.task-table tr.el-table__row td {
        font-size: 12px;
        padding: 13px 0!important;
    }
</style>