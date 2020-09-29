import Axis from './axis'
import AxisTag from './axis-tag'
import FilterDialog from './filter-dialog'

const Loading = {
    install: function (Vue) {
        Vue.component('axis', Axis);
        Vue.component('axis-tag', AxisTag);
        Vue.component('filter-dialog', FilterDialog);
    }
};
export default Loading;