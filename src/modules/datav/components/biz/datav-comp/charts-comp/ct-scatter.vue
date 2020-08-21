<template>
    <ve-scatter :option="chartOptions"/>
</template>

<script>
    export default {
        name: 'ct-scatter',
        props: {
            chartOptions: {
                type: Object,
                default: function () {
                    return {
                        title: {
                            text: '周销售额趋势'
                        },
                        legend: {
                            data: ['系列A', '系列B', '系列C']
                        },
                        xAxis: {
                            name: '第一周',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                        yAxis: {
                            name: '销售额',
                            data: 'value'
                        },
                        series: [
                            {
                                name: '系列A',
                                data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                                type: 'line',
                                stack: 'a',
                                fill: {
                                    show: true
                                }
                            },
                            {
                                name: '系列B',
                                data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                                type: 'line',
                                stack: 'a',
                                smooth: true
                            },
                            {
                                name: '系列C',
                                data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                                type: 'line',
                                stack: 'a',
                                lineStyle: {
                                    lineDash: [5, 5]
                                }
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