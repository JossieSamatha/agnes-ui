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
    },
    mounted() {
        this.$set(this.compOption.chartSettings, 'area', true);
    }
}