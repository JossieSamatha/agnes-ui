import BaseCharts from "../baseChart";

export default {
    name: "CtArea",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-line'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}