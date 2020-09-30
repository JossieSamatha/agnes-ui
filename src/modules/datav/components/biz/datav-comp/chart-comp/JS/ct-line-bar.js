import BaseCharts from "../baseChart";

export default {
    name: "CtLineBar",
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
    },
    mounted() {
        this.$set(this.compOption, 'doubleCharts', true);
    }
}