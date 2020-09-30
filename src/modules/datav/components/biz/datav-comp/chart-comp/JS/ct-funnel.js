import BaseCharts from "../baseChart";

export default {
    name: "CtFunnel",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-funnel'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}