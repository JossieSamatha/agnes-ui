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
        title: {
          type: String
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
            let legendName=[], valueSum = 0, doneSum = 0;
            const colorSet = this.colorSet;
            this.chartData.forEach(function (item) {
                legendName.push(item.name);
                if (item.name == "已完成") {
                    doneSum = item.value
                }
                valueSum += item.value;
            });
            const title = {
                zlevel: 0,
                text: doneSum === valueSum ? '100%' : this.title,
                rich: {
                    value: {
                        color: '#333',
                        fontSize: 14
                    },
                },
                top: 'center',
                left: 'center',
                textStyle: {
                    color: "#476dbe",
                    fontSize: 30,
                    fontWeight: '500'
                }
            };
            const tooltip ={
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
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
                    radius: ['45%', '60%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            label:{
                                show: false,
                                position: 'outside',
                                formatter:'{b} : {c} ({d}%)'
                            },
                            labelLine: {
                                show: false
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
                y2: 35,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
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
                let valueSum = 0,legendName=[], doneSum = 0;
                newVal.forEach(function (item) {
                    legendName.push(item.name);
                    if (item.name == "已完成") {
                        doneSum = item.value
                    }
                    valueSum += item.value;
                });
                this.pieChart.setOption({
                    title: {
                        zlevel: 0,
                        text: doneSum === valueSum ? '100%' : this.title,
                        rich: {
                            value: {
                                color: '#333',
                                fontSize: 14
                            },
                        },
                        top: 'center',
                        left: 'center',
                        textStyle: {
                            color: "#476dbe",
                            fontSize: 30,
                            fontWeight: 500
                        }
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