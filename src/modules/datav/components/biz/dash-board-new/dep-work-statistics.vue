<template>
    <div style="height: 100%">
        <p class="rec-legend">
            <span>
                <em class="rect-block" style="background: #526DF6"></em>
                完成个数
            </span>
            <span>
                <em class="rect-block" style="background: #E9736F"></em>
                超时个数
            </span>
        </p>
        <stack-bar :x-axis="xAxis" :series-data="seriesData" :hasDataZoom="true" style="height: 100%"></stack-bar>
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
                xAxis: ["陈凯歌","李丽丽","张晓明","王小明","木梁","张曼雪",
                    "李立昌","爱德华","菲亚特","温斯顿"],
                seriesData: [{
                    name: '超时个数',
                    stack:'使用情况',
                    barWidth: 30,
                    color:"#E9736F",
                    data: [8, 3, 5, 5, 10, 6, 8, 12, 3, 5],
                },{
                    name: '完成个数',
                    stack:'使用情况',
                    barWidth: 30,
                    color:"#526DF6",
                    data: [40, 38, 36, 36, 33, 38, 40, 40, 42, 38],
                }]
            }
        },
    }
</script>

<style scoped>
    .rec-legend {
        position: absolute;
        right: 0;
        top: 0px;
    }

    .rec-legend .rect-block {
        display: inline-block;
        width: 12px;
        height: 10px;
        border-radius: 2px;
    }
    .rec-legend>span+span {
        margin-left: 10px;
    }

</style>