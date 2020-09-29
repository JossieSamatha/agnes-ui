<template>
    <component
            :is="chartName"
            :data="chartData"
            :settings="compOption.chartSettings"
            :extend="percentExtend"
            :theme="dataVTheme"
            width="100%"
            height="100%">
    </component>
</template>

<script>
    let _this = null;
    import mockInterData from "../../../../pages/monitor-view/mockInterData";
    export default {
        name: "baseCharts",
        props: {
            compOption: {type: Object},
            chartSettings: {type: Object},
            chartName: {type: String}
        },
        mounted() {
            _this = this;
        },
        data() {
            return {
                chartData: {},
                percentArr: [],
                xOrder: false,
                yOrder: false,
                xRiseOrder: false,
                xDropOrder: false,
                yRiseOrder: false,
                yDropOrder: false,
                yField: '',
                xField: '',
                xType: '',
                dataVTheme: this.$dataVTheme.dark
            }
        },
        methods: {
            createChart() {
                let xFields = this.compOption.xFields;
                let metrics = this.compOption.metrics;
                let filter = this.compOption.filter;
                if (xFields && metrics && xFields.length > 0 && metrics.length > 0) {
                    this.initChartData(xFields, metrics, filter);
                }
            },
            initChartData(xAxis, yAxis, filter) {
                this.percentArr = [];
                /*获取后端数据*/
                let params = {
                    dataSetId: "",
                    xFields: [],
                    metrics: [],
                    filter: {}
                };
                params['dataSetId'] = this.compOption.dataSourceId;
                params['xFields'] = xAxis;
                params['metrics'] = yAxis;
                params['filter'] = filter;
                params['dataCount'] = this.compOption.dataCount;

                // 模拟数据挂载
                /* =============  start  ==================*/
                const mockData = mockInterData().chartData;
                let res = mockData;
                /* =============  end  ==================*/

                // this.$api.DatavDatavApi.createChart(params).then(res => {
                    if (this.$utils.isArray(res) && res.length > 0) {
                        /*后端%数据通过format正常显示*/
                        Object.keys(res[0]).forEach((objKey, objIndex) => {
                            if (typeof (res[0][objKey]) === 'string' && res[0][objKey].indexOf('%') > -1) {
                                this.percentArr.push(objIndex);
                            }
                        });
                        this.$set(this.chartData, 'rows', res);
                        /*  保存一份数据作为静态数据*/
                        this.$store.commit("changeChartData", this.chartData);
                    } else {
                        this.$set(this.chartData, 'rows', []);
                    }
                // });
            },
            legendDirection() {
                if (this.compOption.legendPosition == 'bottom') {
                    this.percentExtend.legend.top = undefined;
                    this.percentExtend.legend.bottom = 10;
                    this.percentExtend.legend.left = 'center';
                    this.percentExtend.legend.right = undefined;
                    this.percentExtend.legend.orient = 'horizontal'
                } else if (this.compOption.legendPosition == 'top') {
                    this.percentExtend.legend.top = 10;
                    this.percentExtend.legend.bottom = undefined;
                    this.percentExtend.legend.left = 'center';
                    this.percentExtend.legend.right = undefined;
                    this.percentExtend.legend.orient = 'horizontal'
                } else if (this.compOption.legendPosition == 'left') {
                    this.percentExtend.legend.top = 'middle';
                    this.percentExtend.legend.bottom = undefined;
                    this.percentExtend.legend.left = 0;
                    this.percentExtend.legend.right = undefined;
                    this.percentExtend.legend.orient = 'vertical';
                } else if (this.compOption.legendPosition == 'right') {
                    this.percentExtend.legend.top = 'middle';
                    this.percentExtend.legend.bottom = undefined;
                    this.percentExtend.legend.left = undefined;
                    this.percentExtend.legend.right = 0;
                    this.percentExtend.legend.orient = 'vertical'
                }
            },
        },
        computed: {
            percentExtend() {
                return {
                    series: {
                        label: {
                            show: this.compOption.extend ? this.compOption.extend.series : '',
                            formatter: (params) => {
                                if (_this.percentArr && _this.percentArr.indexOf(params.seriesIndex) > -1) {
                                    let str = (params.data[1]) + '%';
                                    return str;
                                }
                            },
                            position: 'top'
                        },
                        smooth: false,
                    },
                    legend: {
                        bottom: 10,
                        orient: 'horizontal',//vertical,horizontal
                        formatter: (params) => {
                            if (_this.compOption.metrics) {
                                _this.compOption.metrics.forEach(item => {
                                    if (item.field === params) {
                                        params = item.headerName;
                                    }
                                })
                            }
                            return params;
                        },
                    },
                    tooltip: {
                        formatter: (params) => {
                            if (params.length > 0) {
                                let result = params[0].name;
                                params.forEach(function (item) {
                                    if (item.data) {
                                        let name = '';
                                        if(_this.compOption.metrics && _this.compOption.metrics.length>0){
                                            _this.compOption.metrics.forEach(dataItem => {
                                                if (dataItem.field === item.seriesName) {
                                                    name = dataItem.headerName;
                                                }
                                            });
                                        }
                                        if (_this.chartName === 've-line') {
                                            result += '<br/>' + item.marker + name + ':' + item.data[1];
                                        } else {
                                            result += '<br/>' + item.marker + name + ':' + item.data;
                                        }
                                    }
                                });
                                return result;
                            }
                        }
                    }
                }
            },
            apiTip() {
                return this.$store.state.apiTip;
            }
        },
        watch: {
            compOption: {
                handler(val) {
                    /*
                    * 双击编辑内容-----api
                    * 再次拖拽---api
                    * 编辑------静态数据
                    * */
                    if (val.compStaticData && val.compStaticData.rows && val.compStaticData.rows.length > 0 && !this.apiTip && !this.compOption.chartData) {
                        this.chartData = val.compStaticData;
                    }
                    if (JSON.stringify(this.chartData) === '{}' && this.compOption.chartData) {
                        this.chartData = this.compOption.chartData;
                    } else {
                        this.createChart();
                    }
                    /*图例*/
                    this.percentExtend.legend.show = val.ifShowLegend;
                    if (val.legendPosition) {
                        this.legendDirection();
                    }
                    /*坐标X轴标签显示方向*/
                    if (this.chartName === 've-histogram' || this.chartName === 've-line' || this.chartName === 've-area') {
                        /*非双轴图*/
                        if (!this.compOption.doubleCharts) {
                            let obj = {
                                axisLabel: {
                                    rotate: -1
                                }
                            };
                            this.$set(this.percentExtend, 'xAxis', obj);
                            let rotate = this.compOption.extend.rotate;
                            this.percentExtend.xAxis.axisLabel.rotate = rotate;
                        }
                        /*坐标Y轴标题*/
                        if (val.chartSettings.yName && val.chartSettings.yName.length > 0 && val.chartSettings.yName[0].length > 0) {
                            let name = val.chartSettings.yName[0];
                            let joinName = name.split('').join('\n');
                            let yAxis = {
                                name: joinName,
                                nameRotate: 360,
                                nameGap: 24,
                                nameLocation: 'middle',
                            };
                            this.percentExtend.yAxis = yAxis;
                        } else {
                            let yAxis = {
                                name: '',
                            };
                            this.percentExtend.yAxis = yAxis;
                        }
                    }
                    /*饼图-显示配置*/
                    if (this.chartName === 've-pie') {
                        this.percentExtend.series.label.show = true;
                        if (this.compOption.chartSettings.label) {
                            this.percentExtend.series.label.formatter = this.compOption.chartSettings.label.formatter;
                            this.percentExtend.series.label.position = this.compOption.chartSettings.label.position
                        }
                    }
                    //条形图的label
                    if (this.chartName === 've-bar') {
                        this.percentExtend.series.label.position = 'right';
                    }
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>