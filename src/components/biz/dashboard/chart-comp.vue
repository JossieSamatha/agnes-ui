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
            var option = this.moduleObj;
            this.myChart.setOption(option);
            var _that = this;
            window.addEventListener('resize', function () {
                _that.myChart.resize();
            });
        }
    }
</script>