<template>
    <div class="gauge-container">
        <div v-for="task in proTask" :key="task.taskId">
            <span class="name">{{task.taskName}}</span>
            <gauge-comp-item class="gauge-comp" :rate="task.finishedRate"></gauge-comp-item>
            <span class="statistic" :style="{color: task.finishedRate<1 ? '#0F5EFF' : '#4BE16E'}">{{task.finished}}/{{task.targetNum}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            moduleObj: Object
        },
        data() {
            return {
                proTask: [
                    {taskId: '01', taskName: '核算晚班工作', finishedRate: '0.78', finished: 44, targetNum: 58},
                    {taskId: '02', taskName: '核算清算流程', finishedRate: '1', finished: 36, targetNum: 36},
                    {taskId: '03', taskName: 'TA资金电子化流程', finishedRate: '0.25', finished: 12, targetNum: 48},
                    {taskId: '04', taskName: 'TA批处理流程', finishedRate: '0.5', finished: 24, targetNum: 48},
                ]
            }
        },
        mounted() {

        },
        methods: {

        },
    }
</script>

<style scoped>
    .gauge-container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .gauge-container>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        height: 100%;
    }

    .gauge-container>div+div {
        margin-left: 24px;
    }

    .gauge-container>div span.name {
        font-size: 14px;
        color: #666;
        margin-bottom: 12px;
    }
</style>