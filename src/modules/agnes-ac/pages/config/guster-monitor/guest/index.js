import guestChartComp from './guest-chart-comp'
import guestFormComp from './guest-form-comp'
import guestGridComp from './guest-grid-comp'
import guestPieChart from './guest-pie-chart'
import rapidContactForm from './rapid-contact-form.vue'

const Loading = {
    install: function (Vue) {
        Vue.component('guest-chart-comp', guestChartComp);
        Vue.component('guest-form-comp', guestFormComp);
        Vue.component('guest-grid-comp', guestGridComp);
        Vue.component('guest-pie-chart', guestPieChart);
        Vue.component('rapid-contact-form', rapidContactForm);
    }
};

export default Loading;