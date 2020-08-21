<template>
    <dv-charts :option="chartOptions"/>
</template>

<script>
    export default {
        name: 'ct-bar',
        props: {
            chartOptions: {
                type: Object,
                default: function () {
                    return {
                        xAxis: {
                            name: '时间点/小时',
                            data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
                            nameTextStyle: {
                                fill: '#fff',
                                fontSize: 12
                            },
                            axisLabel: {
                                style: {
                                    fill: '#fff',
                                    textAlign: 'left',
                                    textBaseline: 'top'
                                }
                            },
                            axisLine: {
                                style: {
                                    stroke: '#fff'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: [
                            {
                                name: '任务数/个',
                                data: 'value',
                                nameTextStyle: {
                                    fill: '#fff',
                                    fontSize: 12
                                },
                                axisLabel: {
                                    style: {
                                        fill: '#fff'
                                    },
                                    formatter: '{value}'
                                },
                                axisLine: {
                                    style: {
                                        stroke: '#fff'
                                    }
                                },
                            }
                        ],
                        series: [
                            {
                                name: '任务数/个',
                                data: [41,12,20,30,20,18,20,20,24,20,30,20,30],
                                type: 'bar',
                                gradient: {
                                    color: ['#37a2da', '#67e0e3']
                                },
                                label: {
                                    style: {
                                        fontSize: 12,
                                        color: '#fff'
                                    }
                                },
                                animationCurve: 'easeOutBounce'
                            }
                        ]
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>