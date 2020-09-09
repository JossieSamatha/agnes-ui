export const DEFAULT_THEME = {
    categoryAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
    },
    valueAxis: {
        axisLine: { show: false }
    },
    line: {
        smooth: true
    },
    grid: {
        containLabel: true,
        left: 10,
        right: 10
    }
}

export const ECHARTS_SETTINGS = [
    'grid', 'dataZoom', 'visualMap',
    'toolbox', 'title', 'legend',
    'xAxis', 'yAxis', 'radar',
    'tooltip', 'axisPointer', 'brush',
    'geo', 'timeline', 'graphic',
    'series', 'backgroundColor', 'textStyle'
]
