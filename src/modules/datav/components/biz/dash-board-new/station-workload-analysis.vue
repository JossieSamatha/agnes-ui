<template>
    <div style="height: 100%">
        <stack-bar :x-axis="xAxis" :series-data="seriesData" style="height: calc(100% - 20px)"></stack-bar>
        <p class="circle-legend">
            <span>
                <em class="fa fa-dot-circle-o" style="color: #526DF6"></em>
                正常处理
            </span>
            <span>
                <em class="fa fa-dot-circle-o" style="color: #E9736F"></em>
                超时处理
            </span>
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            pagetype: String,
            quartzTime: String,
        },
        data() {
            return {
                xAxis: ["岗位1","岗位2","岗位3","岗位4","岗位5"],
                seriesData: [{
                    name: '正常处理',
                    stack:'处理情况',
                    barWidth: 10,
                    color:"#526DF6",
                    data: [40, 38, 36, 36, 35],
                },{
                    name: '超时处理',
                    stack:'处理情况',
                    barWidth: 10,
                    color:"#E9736F",
                    data: [8, 4, 5, 5, 10, 6, 8, 12, 3, 5],
                }]
            }
        },
    }
</script>

<style scoped>
    .circle-legend {
        position: absolute;
        left: 0;
        bottom: 20px;
    }

    .circle-legend>span+span {
        margin-left: 10px;
    }
</style>