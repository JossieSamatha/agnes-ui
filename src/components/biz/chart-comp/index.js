import pieChart from './pie-chart'

const Loading = {
    install: function (Vue) {
        Vue.component('pie-chart', pieChart);
    }
}

export default Loading;