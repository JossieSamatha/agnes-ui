<template>
    <div ref="stackBar" style="width: 100%;height: 100%"></div>
</template>

<script>
    export default {
        props: {
            seriesData: {
                type: Array,
                required: true
            },
            xAxis: {
                type: Array,
                required: true
            },
            hasDataZoom: Boolean
        },
        data() {
            return {
                stackBar: {},
                dataZoom: [
                    {
                    type: 'inside',
                    start: 0,
                    end: 60
                    }, {
                        start: 0,
                        end: 10,
                        height: 8,
                        left: '20%',
                        right: '20%',
                        bottom: 8,
                        showDetail: false,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '15',
                        fillerColor: '#5896F7',
                        backgroundColor: '#D8DBE3',
                        dataBackground: {
                            lineStyle: {
                                color: 'none'
                            },
                            areaStyle: {
                                color: 'none'
                            }
                        },
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: '#666',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0
                        }
                    }]
            }
        },
        mounted() {
            this.stackBarInit();
        },
        methods: {
            stackBarInit() {
                this.stackBar = this.echarts.init(this.$refs.stackBar);
                const stackBarOption = {
                    grid: {
                        left: 25,
                        top: 20,
                        right: 0
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        data: this.xAxis,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#666'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#999',
                            }
                        },
                        splitLine:{
                            show: true,
                            lineStyle: {
                                color: '#ccc',
                                type: 'dashed'
                            }
                        },
                    },
                    series: this.seriesData.map((item)=>{
                        return {
                            name: item.name,
                            type: 'bar',
                            stack: item.stack,
                            barWidth: item.barWidth,
                            data: item.data,
                            itemStyle:{
                                normal:{color: item.color},
                            }
                        }
                    }),
                };
                if(this.hasDataZoom){
                    stackBarOption.dataZoom = this.dataZoom;
                }
                this.stackBar.setOption(stackBarOption);
                this.$nextTick(()=>{
                    this.stackBar.resize();
                });
                window.addEventListener('resize', () => {
                    this.stackBar.resize()
                });
            }
        },
        watch: {
            xAxis(val){
                this.stackBar.setOption({
                    xAxis: {
                        data: val,
                    }
                });
                this.$nextTick(()=>{
                    this.stackBar.resize();
                });
            },
            seriesData(val){
                this.stackBar.setOption({
                    series: val.map((item)=>{
                        return {
                            name: item.name,
                            type: 'bar',
                            stack: item.stack,
                            barWidth: item.barWidth,
                            data: item.data,
                            itemStyle:{
                                normal:{color: item.color},
                            }
                        }
                    }),
                });
                this.$nextTick(()=>{
                    this.stackBar.resize();
                });
            }
        }
    }
</script>

<style scoped>

</style>