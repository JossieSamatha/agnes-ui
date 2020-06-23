<template>
    <div id="pieChart" style="width:100%;height: 250px"></div>
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
        },
        data: function () {
            return  {
                pieChart: {},
            }
        },
        methods: {
            init : function() {
                this.pieChart = this.echarts.init(this.$el);
                var legendName=[], valueSum = 0;
                var colorSet = this.colorSet;
                this.chartData.forEach(function (item) {
                    legendName.push(item.name);
                    valueSum += item.value;
                });

                var title = {
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
                var tooltip ={
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                };
                var graphic = {
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
                var legend={
                    orient: 'horizontal',
                    icon : 'circle',
                    x: 'center',
                    y: 'bottom',
                    itemWidth: 8,
                    itemGap: 20,
                    data: legendName
                };
                var series=[
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
                var grid = {
                    y: 35,
                    y2: 35
                };
                var option={
                    legend:legend,
                    title:title,
                    tooltip:tooltip,
                    graphic: graphic,
                    series:series,
                    grid: grid
                }
                this.pieChart.setOption(option);
                this.pieChart.resize();
                var _that = this;
                window.addEventListener('resize', function () {
                    _that.pieChart.resize()
                });
            }
        },
        watch: {
            chartData: {
                handler: function(newVal) {
                    var valueSum = 0,legendName=[];
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
            this.init()
        }
    }
</script>