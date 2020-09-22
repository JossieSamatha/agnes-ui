<template>
    <el-container class="elec-process elec-process-dashboard">
        <section class="dataSearch">
            <div class="flow-type">
                <p class="section-label">当前流程类型：</p>
                <gf-dict class="flow-type-select"
                         clearable
                         dict-type="AGNES_CASE_FLOWTYPE"
                         size="mini"
                         v-model="flowType"
                         :disabled="true"
                         style="width: 175px;margin-right: 12px;"/>
            </div>
            <div>
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
            </div>
        </section>
        <section class="board-container" ref="contentSection" style="height: 100%">
            <el-carousel v-if="proTask && proTask.length>0"
                        style="width: 100%;" :style="{height: carouselHeight + 'px'}"
                         height="100%"
                         arrow="always"
                         :autoplay="false">
                <el-carousel-item v-for="(carousel, index) in proTask" :key="index">
                    <div class="card-container" >
                        <template v-for="task in carousel">
                            <module-card shadow="always" :class="curTask.taskId==task.taskId?'active':''" :key="task.taskId"
                                         @click.native="chooseTask(task)">
                                <template slot="content">
                                    <p class="imgContainer">
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
                        </template>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="card-detail" v-if="curTask.taskId">
                <div class="chart-container">
                    <pie-chart ref="pieChart" :chart-data="executePieData" pieHeight="70%"
                               legendPosX="right" legendPosY="top"
                               :color-set="['#476DBE','#E0E0E0']"></pie-chart>
                    <p class="detail-btn" @click="reivewDetail">查看详情</p>
                </div>
                <div class="process-container">
                    <div class="flow-legend">
                        <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                            <i class="fa fa-circle" :style="{color: statusColor}"
                            ></i>{{status}}
                        </span>
                    </div>
                    <div class="progress">
                        <div class="progress-item" v-for="stage in stageList" :key="stage.defId">
                            <el-progress class="define-progress"
                                         type="circle"
                                         :style="{color: getStatusColor(stage.status)}"
                                         :percentage="getPercentage(stage.percentage)"
                                         :color="getStatusColor(stage.status)"
                                         :width="56"
                                         :stroke-width="6"
                            ></el-progress>
                            <span>{{stage.stageTitle}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </el-container>
</template>

<script>
    import boardDetail from './board-detail';
    export default {
        data(){
            return {
                svgImg: this.$lcImg,
                carouselHeight: 0,
                flowType: '01',
                proTask: [],
                executePieData: [
                    {name: '已完成', value: 80},
                    {name: '未完成', value: 20}
                ],
                bizDate: '',
                curTask: {},
                stageStatus: {
                    '#DFE1E5': '未开始',
                    '#4A8EF0': '执行中',
                    '#FAAE14': '强制通过',
                    '#F5222E': '已异常/已超时',
                    '#52C41C': '已完成'
                },
                stageList: [{defId: '0', percentage: 0.5, status: '01', stageTitle: '早班'},
                    {defId: '1', percentage: 0.7, status: '02', stageTitle: '日间清算'},
                    {defId: '2', percentage: 0.2, status: '03', stageTitle: '系统检查'},
                    {defId: '3', percentage: 0.4, status: '04', stageTitle: '晚班'}]
            }
        },
        async created(){
            // 默认系统业务日期
            this.bizDate = window.bizDate;
            this.getFLowsbyType(this.bizDate);
        },
        mounted(){
            this.$nextTick(()=>{
                this.bizDate = window.bizDate;
                this.getCarouselHeight();
            });
        },
        methods: {
            // 业务日期切换
            bizDateChange(val) {
                this.getFLowsbyType(val);
            },

            getCarouselHeight(){
                if(this.$refs.contentSection){
                    this.carouselHeight =  (this.$refs.contentSection.clientWidth - 60) * 0.12 + 40;
                }
            },

            calcCardLength(length){
                const intLength = length % 4 === 0;
                return intLength ? length / 4 : parseInt(length / 4 + 1);
            },

            // 根据流程类型加载对应流程数据
            async getFLowsbyType(bizDate) {
                const flowDataRes = this.$api.elecProcessApi.queryExecRuTask({bizDate});
                const flowDataList = await this.$app.blockingApp(flowDataRes);
                if (flowDataList.data && flowDataList.data.length > 0) {
                    const data = flowDataList.data;
                    const carouselLength = this.calcCardLength(flowDataList.data.length);
                    for(let i=0; i<carouselLength; i++){
                        const itemData = data.splice(i*4, i*4+4);
                        this.proTask.push(itemData);
                    }
                }else{
                    this.proTask = [];
                }
                this.getCarouselHeight();
            },

            // 选择流程
            chooseTask(task){
                this.curTask = task;
            },

            reivewDetail(){
                if(this.curTask && this.curTask.taskId){
                    const task = this.curTask;
                    this.$drawerPage.create({
                        className: 'elec-dashboard-drawer',
                        width: 'calc(97% - 215px)',
                        title: [`${task.taskName}【${this.bizDate}】`],
                        component: boardDetail,
                        args: {bizDate: this.bizDate, task: task},
                        cancelButtonTitle: '返回',
                        okButtonTitle: '刷新'
                    });
                }
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