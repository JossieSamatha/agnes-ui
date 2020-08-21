<template>
    <dv-charts :option="chartOptions"/>
</template>

<script>
    export default {
        name: 'ct-pie',
        props: {
            chartOptions: {
                type: Object,
                default: function () {
                    return {
                        series: [
                            {
                                name: '同比',
                                type: 'pie',
                                data: [
                                    { name: 'FA清算工作监控', value: 19.59 },
                                    { name: 'FA晚班工作监控台', value: 20.41 },
                                    { name: 'TA资金电子化流程', value: 19.79 },
                                    { name: 'TA批处理监控台', value: 20.21 },
                                    { name: '风险监控指标', value: 20.00 },
                                ],
                                radius: '30%',
                                outsideLabel: {
                                    show: false
                                },
                                insideLabel: {
                                    show: true
                                }
                            },
                            {
                                name: '环比',
                                type: 'pie',
                                data: [
                                    { name: 'FA清算工作监控', value: 19.59 },
                                    { name: 'FA晚班工作监控台', value: 20.41 },
                                    { name: 'TA资金电子化流程', value: 19.79 },
                                    { name: 'TA批处理监控台', value: 20.21 },
                                    { name: '风险监控指标', value: 20.00 },
                                ],
                                radius: ['40%', '50%']
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