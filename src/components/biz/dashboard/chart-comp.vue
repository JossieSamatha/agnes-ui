<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            },
        },
        data: function () {
            return  {
                myChart: {},
            }
        },
        mounted : function() {
            this.myChart = this.echarts.init(this.$el);
            const option = this.moduleObj;
            this.myChart.setOption(option);
            window.addEventListener('resize', () => {
                this.myChart.resize();
            });
        }
    }
</script>