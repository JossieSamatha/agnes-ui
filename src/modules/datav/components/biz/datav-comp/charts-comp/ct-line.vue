<template>
    <dv-charts ref="lineChart" :option="chartOption" width="100%" height="100%"/>
</template>

<script>
    export default {
        name: 'ct-line',
        props: {
            compOption: {
                type: Object,
                default: function () {
                    return {
                        xAxis: {
                            name: '年份',
                            nameTextStyle: {
                                fill: '#fff',
                                fontSize: 12
                            },
                            data: ['2014', '2015', '2016', '2017', '2018', '2019'],
                            boundaryGap: false,
                            axisLine: {
                                style: {
                                    stroke: '#fff'
                                }
                            },
                            axisLabel: {
                                style: {
                                    fill: '#fff'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: {
                            name: '规模',
                            nameTextStyle: {
                                fill: '#fff',
                                fontSize: 12
                            },
                            data: 'value',
                                splitLine: {
                                show: false
                            },
                            axisLine: {
                                style: {
                                    stroke: '#fff'
                                }
                            },
                            axisLabel: {
                                style: {
                                    fill: '#fff'
                                },
                                formatter ({ value }) {
                                    return value.toFixed(2)
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            // interval: 0.5
                        },
                        series: [
                            {
                                data: [100, 230, 100, 200, 300, 400],
                                type: 'line',
                                name: '规模',
                                smooth: true,
                                lineArea: {
                                    show: true,
                                    gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                },
                                linePoint: {
                                    radius: 4,
                                    style: {
                                        fill: '#00db95'
                                    }
                                }
                            },
                            {
                                data: [200, 230, 900, 100, 500, 200],
                                type: 'line',
                                name: '产品',
                                smooth: true,
                                lineArea: {
                                    show: true,
                                    gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                },
                                linePoint: {
                                    radius: 4,
                                    style: {
                                        fill: '#00db95'
                                    }
                                }
                            },
                            {
                                data: [120, 223, 190, 210, 350, 420],
                                type: 'line',
                                name: '客户数',
                                smooth: true,
                                lineArea: {
                                    show: true,
                                    gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                                },
                                linePoint: {
                                    radius: 4,
                                    style: {
                                        fill: '#00db95'
                                    }
                                }
                            }
                        ]
                    }
                }
            },
        },
        mounted(){
            console.log("this.compOption",this.compOption);
        },
        computed: {
            chartOption(){
                return this.compOption.optional.componentMeta;
            }
        },
        methods: {
            resizeCharts(){
                this.$refs.lineChart.resize();
            }
        }
    }
</script>