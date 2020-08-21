<template>
    <dv-charts :option="chartOptions"/>
</template>

<script>
    export default {
        name: 'ct-radar',
        props: {
            chartOptions: {
                type: Object,
                default: function () {
                    return {
                        title: {
                            text: '剩余油量表',
                            style: {
                                fill: '#fff',
                            }
                        },
                        series: [
                            {
                                type: 'gauge',
                                data: [ { name: 'itemA', value: 55 } ],
                                axisLabel: {
                                    formatter: '{value}%',
                                    style: {
                                        fill: '#fff',
                                    }
                                },
                                details: {
                                    show: true,
                                    offset: [0, 40],
                                    formatter: '剩余{value}%'
                                },
                                animationCurve: 'easeOutBack'
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