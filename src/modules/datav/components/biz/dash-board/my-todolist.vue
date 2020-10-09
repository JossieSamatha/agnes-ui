<template>
    <div>
        <div v-for="(item, index) in JSON.parse(moduleObj.rowData)"
            :key="index" class="todolist-container">
            <div class="task-icon">
                <div></div>
            </div>
            <div class="task-des">
                <div>{{item.taskType}}</div>
                <div>{{item.currentTask}}</div>
            </div>
            <div class="task-time">
                <div>{{item.taskDate}}</div>
                <div>{{item.taskTime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-todolist",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style scoped>
    .todolist-container {
        height: 70px;
        width: 100%;
        position: relative;
    }
    .task-icon,
    .task-des,
    .task-time {
        display: inline-block;
        position: absolute;
        top: 50%;
        font-size: 12px;
    }
    .task-icon {
        width: 10%;
    }
    .task-icon > div {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #709FED;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .task-des {
        width: 70%;
        left: 46%;
        transform: translate(-50%, -50%);
    }
    .task-des > div:nth-child(1) {
        color: #666;
        margin-bottom: 6px;
    }
    .task-des > div:nth-child(2) {
        color: #ccc;
    }
    .task-time {
        width: 20%;
        right: 0;
        transform: translate(0px, -50%);
    }
    .task-time > div:nth-child(1) {
        color: #9a9a9a;
        margin-bottom: 6px;
    }
    .task-time > div:nth-child(2) {
        color: #ccc;
    }
</style>