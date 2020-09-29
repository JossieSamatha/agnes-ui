import BaseCharts from "../baseChart";

export default {
    name: "CtGauge",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-gauge'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}