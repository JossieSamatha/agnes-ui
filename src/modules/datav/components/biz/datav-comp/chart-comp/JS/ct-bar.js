import BaseCharts from "../baseChart";

export default {
    name: "CtBar",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-histogram'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}