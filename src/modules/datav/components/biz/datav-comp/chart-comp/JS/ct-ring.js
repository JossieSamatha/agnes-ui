import BaseCharts from "../baseChart";

export default {
    name: "CtPie",
    extends: BaseCharts,
    props: {
        chartName: {
            default: 've-ring'
        },
        compOption: {
            default: {
                type: Object
            }
        }
    }
}