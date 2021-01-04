<template>
    <div class="gauge-container">
        <div v-for="task in proTask" :key="task.taskId">
            <el-badge class="badge" :value="task.errNum" :max="99" :hidden="!(task.errNum && task.errNum>1)">
                <span class="name" :title="task.taskName">{{task.taskName}}</span>
            </el-badge>
            <gauge-comp-item class="gauge-comp" :rate="rateCalc(task.doneNum, task.targetNum)"></gauge-comp-item>
            <span class="statistic" :style="{color: rateCalc(task.doneNum, task.targetNum)<1 ? '#0F5EFF' : '#4BE16E'}">
                {{task.doneNum}}/{{task.targetNum}}
            </span>
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
            this.getData();
        },
        methods: {
            async getData(){
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                let exeTime = resChangeData.bizDate;
                let resp1 = await this.$api.HomePageApi.selectExecProcessDetailOfToday(exeTime);
                if(resp1){
                    this.proTask = resp1.data;
                }
            },

            rateCalc(numerator, denominator){
                const rate = parseFloat((numerator / denominator).toFixed(2));
                return rate;
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
        flex: none;
        width: 22%;
        height: 100%;
    }

    .gauge-container>div+div {
        margin-left: 3%;
    }

    .gauge-container>div .badge {
        max-width: 100%;
        margin: 12px 0;
        text-align: center;
    }

    .gauge-container>div .badge>span {
        display: block;
        color: #666;
        font-size: 14px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
    }
</style>