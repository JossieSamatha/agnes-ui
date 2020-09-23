<template>
    <div id="pieChart" style="width:100%;" :style="{height: pieHeight}"></div>
</template>

<script>
    export default {
        props: {
            colorSet: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            chartData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            pieHeight: {
                type: String,
                default: '250px'
            },
            legendPosX: {
                type: String,
                default: 'center'
            },
            legendPosY: {
                type: String,
                default: 'bottom'
            }
        },
        data: function () {
            return  {
                pieChart: {},
            }
        },
        methods: {
            init() {
                this.pieChart = this.echarts.init(this.$el);
                let legendName=[], valueSum = 0;
                const colorSet = this.colorSet;
                this.chartData.forEach(function (item) {
                    legendName.push(item.name);
                    valueSum += item.value;
                });

                const title = {
                    zlevel: 0,
                    text: valueSum+'个',
                    rich: {
                        value: {
                            color: '#333',
                            fontSize: 14
                        },
                    },
                    top: 'center',
                    left: 'center',
                };
                const tooltip ={
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                };
                const graphic = {
                    type:'text',
                    left:'center',
                    top:'center',
                    style:{
                        text: '',
                        textAlign: 'center',
                        fill: '#000',
                        width:30,
                        height:30
                    }
                };
                const legend={
                    orient: 'horizontal',
                    icon : 'circle',
                    x: this.legendPosX,
                    y: this.legendPosY,
                    itemWidth: 8,
                    itemGap: 20,
                    data: legendName
                };
                const series=[
                    {
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: 'center',
                        hoverAnimation: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal:{
                                label:{
                                    show:true,
                                    position: 'outside',
                                    formatter:'{b} : {c} ({d}%)'
                                },
                                color:function(params) {
                                    //自定义颜色
                                    return colorSet[params.dataIndex];
                                }
                            }
                        },
                        data:this.chartData,
                    }
                ];
                const grid = {
                    y: 35,
                    y2: 35
                };
                const option={
                    legend:legend,
                    title:title,
                    tooltip:tooltip,
                    graphic: graphic,
                    series:series,
                    grid: grid
                }
                this.pieChart.setOption(option);
                this.pieChart.resize();
                window.addEventListener('resize', () => {
                    this.pieChart.resize()
                });
            }
        },
        watch: {
            chartData: {
                handler: function(newVal) {
                    let valueSum = 0,legendName=[];
                    newVal.forEach(function (item) {
                        legendName.push(item.name);
                        valueSum += item.value;
                    });
                    this.pieChart.setOption({
                        title: {
                            text: valueSum+'个',
                        },
                        legend: {
                            data: legendName
                        },
                        series: [
                            {
                                data: newVal,
                            }
                        ]
                    });
                    this.pieChart.resize();
                },
            },

        },
        mounted : function () {
            this.init();

        }
    }
</script>