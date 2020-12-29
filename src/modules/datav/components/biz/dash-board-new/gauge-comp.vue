<template>
    <div class="gauge-container">
        <div v-for="task in proTask" :key="task.taskId">
            <span class="name">{{task.taskName}}</span>
            <gauge-comp-item class="gauge-comp" :rate="task.doneNumRate"></gauge-comp-item>
            <span class="statistic" :style="{color: task.doneNumRate<1 ? '#0F5EFF' : '#4BE16E'}">{{task.doneNum}}/{{task.targetNum}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                proTask: []
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init(){
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                let exeTime = resChangeData.bizDate;
                let resp1 = await this.$api.HomePageApi.selectExecProcessDetailOfToday(exeTime);
                if(resp1){
                    this.proTask = resp1.data;
                }
            }
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