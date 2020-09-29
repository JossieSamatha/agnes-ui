<template>
    <div>
        <div v-for="(item, index) in JSON.parse((moduleObj.rowData))"
             :key="index" class="notice-list"
        >
            <div class="el-icon-chat-line-square"></div>
            <div class="notice-state">
                {{item.abnormal}}
            </div>
            <div class="notice-date">
                {{item.taskDate}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-event",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style scoped>
    .notice-list {
        width: 100%;
        margin: 25px;
    }
    .el-icon-chat-line-square,
    .notice-date,
    .notice-state {
        display: inline-block;
        font-size: 12px;
    }
    .el-icon-chat-line-square {
        width: 10%;
        font-size: 16px;
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