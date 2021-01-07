<template>
    <el-carousel class="gauge-container"
                 :class="{'hide-arrow': !carouselShow}"
                 arrow="always"
                 :interval="5000"
                 :autoplay="carouselShow"
    >
        <el-carousel-item v-for="(proTaskTtem, index) in proTask" :key="index">
            <div class="gauge-item" v-for="task in proTaskTtem" :key="task.taskId">
                <el-badge class="badge" :value="task.errNum" :max="99" :hidden="!(task.errNum && task.errNum>1)">
                    <span class="name" :title="task.taskName">{{task.taskName}}</span>
                </el-badge>
                <gauge-comp-item class="gauge-comp" :rate="rateCalc(task.doneNum, task.targetNum)"></gauge-comp-item>
                <span class="statistic"
                      :style="{color: rateCalc(task.doneNum, task.targetNum)<1 ? '#0F5EFF' : '#4BE16E'}">
                    {{task.doneNum}}/{{task.targetNum}}
                </span>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        props: {
            pagetype: String,
        },
        data() {
            return {
                proTask: [],
                carouselShow: false
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            async getData() {
                const resp = await this.$api.changeDataApi.getChangeData();
                const resChangeData = resp.data;
                let exeTime = resChangeData.bizDate;
                let resp1 = await this.$api.HomePageApi.selectExecProcessDetailOfToday(exeTime);
                if (resp1) {
                    this.proTask = this.$lodash.chunk(resp1.data, 4);
                    this.carouselShow = this.proTask.length > 1;
                }
            },

            rateCalc(numerator, denominator) {
                const rate = parseFloat((numerator / denominator).toFixed(2));
                return rate;
            }
        },
    }
</script>

<style scoped>
    .gauge-container {
        width: 100%;
        height: 100%;
    }

    .gauge-container >>> .el-carousel__container,
    .gauge-container >>> .el-carousel__container .el-carousel__item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .gauge-container.hide-arrow >>> .el-carousel__arrow {
        display: none;
    }

    .gauge-container .gauge-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: none;
        width: 22%;
        height: 100%;
    }

    .gauge-container .gauge-item + .gauge-item {
        margin-left: 3%;
    }

    .gauge-container .gauge-item .badge {
        max-width: 100%;
        margin: 12px 0;
        text-align: center;
    }

    .gauge-container .gauge-item .badge > span {
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