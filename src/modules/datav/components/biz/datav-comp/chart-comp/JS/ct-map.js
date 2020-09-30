import BaseCharts from "../baseChart";

export default {
    name: "CtMap",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-map'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}