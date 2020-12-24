import tablePie from './table-pie'
import gaugeComp from'./gauge-comp'
import gaugeCompItem from'./guage-comp-item'
import stripComp from'./strip-comp'

const Loading = {
    install: function (Vue) {
        Vue.component('table-pie', tablePie);
        Vue.component('gauge-comp-item', gaugeCompItem);
        Vue.component('gauge-comp', gaugeComp);
        Vue.component('strip-comp', stripComp);
    }
};

export default Loading;
