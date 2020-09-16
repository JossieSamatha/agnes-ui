import BaseCharts from "../baseChart";

export default {
    name: "CtRadar",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-radar'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}