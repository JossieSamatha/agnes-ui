import BaseCharts from "../baseChart";

export default {
    name: "CtStrip",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-bar'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}