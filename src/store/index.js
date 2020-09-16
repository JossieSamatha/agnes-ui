import Vue from 'vue'
import Vuex from 'vuex'
import user from '@hex/ares-ui/src/store/modules/user'
import local from '@hex/ares-ui/src/store/local'

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        editItem: {},
        xField: '',
        xType: '',
        yField: '',
        yType: '',
        yLeftField: '',
        yLeftType: '',
        yRightField: '',
        yRightType: '',
        xRiseOrder: false,
        xDropOrder: false,
        yRiseOrder: false,
        yDropOrder: false,
        yLeftRiseOrder: false,
        yLeftDropOrder: false,
        yRightRiseOrder: false,
        yRightDropOrder: false,
        xList: [],
        yList: [],
        id: '',
        upperId: '',
        apiTip: false,
        chartLabel:"未命名图表",
        imgCode: "",
        chartData: {},
        initDataColumns: []
    },
    mutations: {
        changeDataColumns(state, val) {
            state.initDataColumns = val
        },
        changeImgCode(state, val) {
            state.imgCode = val
        },
        changeXlist(state, val) {
            state.xList = val
        },
        changeYlist(state, val) {
            state.yList = val
        },
        changeEditItem(state, val) {
            state.editItem = val
        },
        changeXField(state, val) {
            state.xField = val
        },
        changeXType(state, val) {
            state.xType = val
        },
        changeXRiseOrder(state, val) {
            state.xRiseOrder = val
        },
        changeXDropOrder(state, val) {
            state.xDropOrder = val
        },
        changeYField(state, val) {
            state.yField = val
        },
        changeYType(state, val) {
            state.yType = val
        },
        changeYRiseOrder(state, val) {
            state.yRiseOrder = val
        },
        changeYDropOrder(state, val) {
            state.yDropOrder = val
        },
        changeYLeftField(state, val) {
            state.yLeftField = val
        },
        changeYLeftType(state, val) {
            state.yLeftType = val
        },
        changeYLeftRiseOrder(state, val) {
            state.yLeftRiseOrder = val
        },
        changeYLeftDropOrder(state, val) {
            state.yLeftDropOrder = val
        },
        changeYRightField(state, val) {
            state.yRightField = val
        },
        changeYRightType(state, val) {
            state.yRightType = val
        },
        changeYRightRiseOrder(state, val) {
            state.yRightRiseOrder = val
        },
        changeYRightDropOrder(state, val) {
            state.yRightDropOrder = val
        },
        changeId(state, val) {
            state.id = val
        },
        changeUpperId(state, val) {
            state.upperId = val
        },
        changeApiTip(state, val) {
            state.apiTip = val
        },
        changeChartLabel(state, val) {
            state.chartLabel = val
        },
        changeChartData(state, val) {
            state.chartData = val
        },
    },
    modules: {
        user
    },
    getters: local
});

export default store