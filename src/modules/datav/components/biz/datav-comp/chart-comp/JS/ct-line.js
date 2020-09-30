import BaseCharts from "../baseChart";

export default {
    name: "CtLine",
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