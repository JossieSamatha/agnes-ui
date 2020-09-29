<template>
    <div>
        <div v-for="(item, index) in JSON.parse((moduleObj.rowData))"
            :key="index" class="notice-list"
        >
            <div class="state-icon">
                <img :src="getImgPath(item.msgName)">
            </div>
            <div class="notice-state">
                {{item.msgName}}
            </div>
            <div class="notice-date">
                {{item.msgDate}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-common",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        methods: {
            getImgPath(val) {
                if (val.includes("完成")) {
                    return require("../../../assets/done.png")
                } else
                if (val.includes("超时")) {
                    return require("../../../assets/overtime.png")
                } else
                if (val.includes("提醒")) {
                    return require("../../../assets/clock.png")
                }
            }
        }
    }
</script>

<style scoped>
    .notice-list {
        width: 100%;
        margin: 25px;
    }
    .state-icon,
    .notice-date,
    .notice-state {
        display: inline-block;
        font-size: 12px;
    }
    .state-icon {
        width: 10%;
    }
    .notice-state {
        width: 70%;
        color: #666;
    }
    .notice-date {
        width: 20%;
        color: #9a9a9a;
    }
</style>