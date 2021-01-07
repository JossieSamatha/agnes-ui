<template>
    <div class="absolute-div">
        <div>
            <div ref="guageCharts" style="width: 100%;height: 100%"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['rate'],
        data() {
            return {
                guageChart: {}
            }
        },
        mounted() {
            this.gaugeCompInit();
        },
        computed: {
            rateValue(){
                return parseFloat(this.rate);
            }
        },
        methods: {
            gaugeCompInit() {
                this.guageChart = this.echarts.init(this.$refs.guageCharts);
                const gaugeOption = {
                    series: [
                        {
                            name: '完成情况',
                            type: 'gauge',
                            min: 0,
                            max: 100,
                            startAngle: 180,
                            endAngle: 0,
                            splitNumber: 4,
                            radius: '100%',
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[this.rateValue, this.rateValue<1 ? '#0F5EFF': '#4BE16E'], [1, '#D7DBE4']],
                                    width: 2,
                                }
                            },
                            axisLabel: {            // 坐标轴小标记
                                fontWeight: 'bolder',
                                color: 'auto'
                            },
                            axisTick: {            // 坐标轴小标记
                                length: '10%',        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    width: 1
                                }
                            },
                            splitLine: {           // 分隔线
                                length: '20%',         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    width: 1,
                                    color: 'auto'
                                }
                            },
                            pointer: {
                                width: 5,
                                length: '50%'
                            },
                            title: {
                                show: false
                            },
                            detail: {
                                show: false
                            },
                            data: [{value: this.rateValue*100}]
                        }
                    ]
                };
                this.guageChart.setOption(gaugeOption);
                this.$nextTick(()=>{
                    this.guageChart.resize();
                });
                window.addEventListener('resize', () => {
                    this.guageChart.resize()
                });
            }
        },
        watch: {
            rateValue(val){
                this.pieChart.setOption({
                    series: [
                        {
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[val, val<1 ? '#0F5EFF': '#4BE16E'], [1, '#D7DBE4']],
                                    width: 2,
                                }
                            },
                            data: [{value: val*100}]
                        }
                    ]
                });
                this.guageChart.resize();
            }
        }
    }
</script>

<style>
    .gauge-comp {
        position: relative;
        flex: 1;
        width: 100%;
        overflow: hidden;
    }

    .gauge-comp.absolute-div>div  {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        padding: 50%;
    }

    .gauge-comp.absolute-div>div>div {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>