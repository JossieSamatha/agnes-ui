<template>
    <el-container class="elec-process elec-process-dashboard">
        <section class="dataSearch">
            <span style="line-height: 28px">业务日期：</span>
            <el-date-picker v-model="bizDate"
                type="date"
                size="mini"
                align="center"
                :clearable="false"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 175px"
                @change="bizDateChange"
            >
            </el-date-picker>
            <i class="el-icon-refresh" title="全部刷新" @click="getFLowsbyType(bizDate)"></i>
        </section>
        <section class="card-container" v-if="proTask">
            <module-card shadow="always" :class="curTask.taskId==task.taskId?'active':''"
                         v-for="task in proTask" :key="task.taskId" @click.native="chooseTask(task)">
                <template slot="content">
                    <p class="imgContainer" :style="{color: getStatusColor(task.taskStatus)}">
                        <i v-if="task.taskIcon" :class="task.taskIcon"></i>
                        <i v-else class="fa fa-cogs"></i>
                    </p>
                    <p class="title">{{task.taskName}}</p>
                    <p style="height: 15px">
                        <el-progress v-if="task.finishedRate" class="monitor-progress" show-text
                                     :percentage="getPercentage(task.finishedRate)"
                                     :color="getStatusColor(task.taskStatus)"
                                     :stroke-width="6"
                        ></el-progress>
                    </p>
                </template>
            </module-card>
            <template v-if="proTask.length%5 != 0">
                <module-card v-for="restIndex in (5-proTask.length%5)" :key="restIndex" style="opacity: 0">
                </module-card>
            </template>
        </section>
    </el-container>
</template>

<script>
    import boardDetail from './board-detail';
    export default {
        data(){
            return {
                svgImg: this.$lcImg,
                proTask: [],
                bizDate: '',
                curTask: {}
            }
        },
        async created(){
            // 默认系统业务日期
            this.bizDate = window.bizDate;
            this.getFLowsbyType(this.bizDate);
        },
        methods: {
            // 业务日期切换
            bizDateChange(val) {
                this.getFLowsbyType(val);
            },

            // 根据流程类型加载对应流程数据
            async getFLowsbyType(bizDate) {
                const flowDataRes = this.$api.elecProcessApi.queryExecRuTask({bizDate});
                const flowDataList = await this.$app.blockingApp(flowDataRes);
                if (flowDataList.data && flowDataList.data.length > 0) {
                    this.proTask = flowDataList.data;
                }else{
                    this.proTask = [];
                }
            },

            // 选择流程
            chooseTask(task){
                this.curTask = task;
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(97% - 215px)',
                    title: [`${task.taskName}【${this.bizDate}】`],
                    component: boardDetail,
                    args: {bizDate: this.bizDate, task: task},
                    cancelButtonTitle: '返回',
                    okButtonTitle: '刷新'
                });
            },

            getPercentage(percentage) {
                return parseInt(percentage * 100) ;
            },

            getStatusColor(statusId) {
                const stepStatus = this.$agnesAcUtils.getStepStatusMap();
                return stepStatus.get(statusId).color;
            },
        }
    }
</script>