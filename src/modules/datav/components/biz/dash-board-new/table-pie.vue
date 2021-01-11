<template>
    <div class="table-pie">
        <div class="table-container">
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
                        ></em>{{rect.name.substr(0,2)}}
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
        props: {
            pageType: String,
            quartzTime: String,
        },
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
                legendRec: [],
                legendCir: [{label: '已完成', color: '#4C6CFF'}, {label: '未完成', color: '#C9CDE3'}],
                pieChart: {},
                freshInterval: null,
            }
        },

        mounted() {
            this.getData();
            this.startInterval();
        },
        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (this.pageType === 'personal' && from.path === '/datav.client.view' ||
                    this.pageType === 'department' && from.path === '/datav.dep.view') {
                    this.clearInterval();
                }
                if (this.pageType === 'personal' && to.path === '/datav.client.view' ||
                    this.pageType === 'department' && to.path === '/datav.dep.view') {
                    this.startInterval();
                }
            }
        },

        computed: {
            intervalMin(){
                const quartzTime = this.quartzTime ? this.quartzTime : '5';
                return parseInt(quartzTime)*60*1000;
            }
        },

        methods: {
            async getData() {
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                this.exeTime = resChangeData.bizDate;
                let resp1 = await this.$api.HomePageApi.selectCaseStepOfToday(this.exeTime);
                let innerPieData = [];
                let outerPieData = [];
                if(resp1){
                    this.taskArr = resp1.data;
                    resp1.data.forEach((item, index)=>{
                        innerPieData.push({
                            value: 100, name: this.getDictName(item.taskCategory), color: this.statusColor[index]
                        });
                        const finishedRate = parseFloat((item.doneNum/item.targetNum).toFixed(2) );
                        const unFinishedRate = 1 - finishedRate ;
                        outerPieData.push(
                            {value: finishedRate*100, name: '已完成'},
                            {value: unFinishedRate*100, name: '未完成'}
                        );
                    });
                    this.legendRec = innerPieData;
                }
                const pieOptions = {
                    tooltip: {
                        show: false
                    },
                    series: [
                        {
                            name: '任务类型',
                            type: 'pie',
                            radius: [0, '35%'],
                            center: ['50%', '50%'],
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
                                        return param.data.color;
                                    }
                                }
                            },
                            data: innerPieData
                        },
                        {
                            name: '完成情况',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
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
                                fontSize: 12,
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
                            data: outerPieData
                        }
                    ]
                }
                this.pieChart = this.echarts.init(this.$refs.pieCharts);
                this.pieChart.setOption(pieOptions);
                this.$nextTick(()=>{
                    this.pieChart.resize();
                });
                window.addEventListener('resize', () => {
                    this.pieChart.resize()
                });
            },
            getDictName(item){
                const dictObj = this.$app.dict.getDictItem("AGNES_TASK_TYPE",item);
                if(dictObj){
                    return dictObj.dictName;
                }
            },
            startInterval(){
                this.freshInterval = setInterval(() => {
                    if (this.$route.path === '/datav.client.view') {
                        this.getData();
                    }else{
                        this.clearInterval();
                    }
                }, this.intervalMin);
            },

            clearInterval(){
                clearInterval(this.freshInterval);
            }
        }
    }
</script>

<style scoped>
    .table-pie {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .table-pie .table-container {
        position: relative;
        flex: none;
        width: 50%;
    }

    .pie-chart {
        position: relative;
        flex: none;
        width: 45%;
        height: 100%;
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