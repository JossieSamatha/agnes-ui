<template>
    <div class="chart-axis">
        <div class="row yAxis-style">
            <div style="margin-left: 10px;white-space: nowrap;">{{axisItem.label}}&nbsp;</div>
            <div style="border: none" id="axis-two">
                <slot name="axis-content" prop=""></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "metric",
        props: {
            axisItem: Object,
        }
    }
</script>

<style scoped>
    .chart-axis {
        border: 1px dashed #eaeaea;
        padding: 6px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .row {
        line-height: 32px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .row > div:last-child {
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        border: 1px #ddd solid;
        padding: 0px 5px;
        border-radius: 4px;
        line-height: 28px;
    }
</style>