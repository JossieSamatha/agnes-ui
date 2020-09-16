import BaseCharts from "../baseChart";

export default {
    name: "CtPie",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-pie'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}