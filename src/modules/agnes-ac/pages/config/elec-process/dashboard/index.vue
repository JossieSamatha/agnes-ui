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
                <em class="el-icon-refresh" title="全部刷新" @click="getFLowsbyType(bizDate)"></em>
                <div class="interval-ctrl">
                    <span v-html="svgImg.startInterval"
                          v-show="ifIntervalStart"
                          title="定时刷新已开启"
                          @contextmenu.prevent="intervalListShow = true"
                          @click="clearFreshInterval(true)"
                    ></span>
                    <span v-html="svgImg.stopInterval"
                          v-show="!ifIntervalStart"
                          title="定时刷新已暂停"
                          @contextmenu.prevent="intervalListShow = true"
                          @click="startFreshInterval(true)"
                    ></span>
                    <ul class="interval-list" v-show="intervalListShow" v-clickoutside="outsideClick">
                        <li v-for="inter in intervalList"
                            :class="intervalMin === inter.value ? 'is-select' : ''"
                            :key="inter.value"
                            @click="chooseIntervalMin(inter.value)"
                        >
                            {{inter.label}}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="board-container" ref="contentSection">
            <el-carousel v-if="proTask && proTask.length>0"
                         style="width: 100%; height: 32%; flex: 0 0 auto;"
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
                                        <em v-if="task.taskIcon" :class="task.taskIcon"></em>
                                        <em v-else class="fa fa-cogs"></em>
                                    </p>
                                    <p class="title" :title="task.taskName">{{task.taskName}}</p>
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
                <div style="position: relative">
                    <dv-water-level-pond v-if="true"
                            :config="{data: [getPercentage(curTask.finishedRate)], shape: 'round', colors: ['#3DE7C9', '#4a8ef0'], waveNum:2, waveHeight: 8, waveOpacity: .5}"
                                         style="width:200px; height: 200px; cursor: pointer"
                    />
                    <template v-else>
                        <pie-chart ref="pieChart" :chart-data="executePieData" :title="pieTitle" pieHeight="200px"
                                   legendPosX="left" legendPos.dv-water-pond-level svgY="top" :color-set="['#476DBE','#E0E0E0']" style="width: 200px"
                        ></pie-chart>
                        <p class="detail-btn" @click="reivewDetail">查看详情</p>
                    </template>
                </div>
                <div class="process-container">
                    <div class="flow-legend">
                        <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                            <em class="fa fa-circle" :style="{color: statusColor}"
                            ></em>{{status}}
                        </span>
                    </div>
                    <div class="progress">
                        <div class="progress-item" v-for="stage in stageList" :key="stage.defId">
                            <span>{{stage.defName}}</span>
                            <el-progress class="define-progress"
                                         :style="{color: getDetailColor(stage.status)}"
                                         :percentage="getPercentage(stage.percentage)"
                                         :color="getDetailColor(stage.status)"
                                         :stroke-width="6"
                                         :show-text="false"
                                         @click.native="stageDetailView(stage)"
                            ></el-progress>
                            <p  :style="{color: getDetailColor(stage.status), position: setPos,}">
                                <span style="margin-left: 10px;color: #333">{{stage.completeNum}}/{{stage.targetNum}}</span>
                                <span class="fa fa-circle"
                                      v-if="stage.status === '03' || stage.status === '04' "
                                      style="cursor: pointer;
                                            color:#F5222E;
                                            position: absolute;
                                            right: 7px;
                                            top: 50%;
                                            transform: translate(0px, -50%);"
                                      @click="showStageError(stage)"
                                ></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-show="ifGridExpand" class="drag-column" id="taskContainerLeft">
            <div class="close-container" @click="closeTableDetail"></div>
            <div class="drag-container" v-dragx="dragColumn"
                 @bindUpdate="dragColumnUpdate"
                 ref="dragColumn">
                <gf-grid class="elec-grid"
                         ref="monitorLeader"
                         height="100%"
                         grid-no="agnes-elec-process-field">
                    <template slot="left">
                        <el-button type="text" icon="fa fa-reply" style="color: #476dbe;" @click="closeTableDetail">  返回</el-button>
                    </template>
                    <template slot="right-before">
                        <span class="full-screen-btn">
                             <em v-show="!ifDetailFullScreen" v-html="lcImg.fullScreen" @click="expandDetailFullScreen(true)"></em>
                            <em v-show="ifDetailFullScreen" v-html="lcImg.exitFullScreen" @click="expandDetailFullScreen(false)"></em>
                        </span>
                    </template>
                </gf-grid>
            </div>
        </div>
    </el-container>
</template>

<script>
import boardDetail from './board-detail';
export default {
    data(){
        return {
            svgImg: this.$svgImg,
            lcImg: this.$lcImg,
            dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 'n'},
            flowType: '',
            proTask: [],
            executePieData: [],
            bizDate: '',
            curTask: {},
            stageStatus: {
                '#4A8EF0': '已完成',
                '#E0E0E0': '未完成',
                '#F5222E': '有异常'
            },
            stageList: [],
            pieTitle: '',
            ifGridExpand: false,
            setPos: "relative",
            ifDetailFullScreen: false,
            freshInterval: null,
            ifIntervalStart: true,
            intervalMin: 1,
            intervalList: [{label: '1分钟', value: 1}, {label: '3分钟', value: 3}, {label: '5分钟', value: 5}],
            intervalListShow: false
        }
    },
    async created(){
        // 默认系统业务日期--默认系统当前业务日期
        this.bizDate = window.bizDate;
        this.getFLowsbyType(this.bizDate);
        this.startFreshInterval();
    },

    beforeDestroy() {
        this.clearFreshInterval();
    },

    watch: {
        // 监听,当路由发生变化的时候执行
        $route(to, from) {
            if (from.path === '/agnes.app.monitor.leader') {
                this.clearFreshInterval();
            }
            if (to.path === '/agnes.app.monitor.leader') {
                if(this.ifIntervalStart) {
                    this.startFreshInterval();
                }
            }
        }
    },
    methods: {
        // 业务日期切换
        bizDateChange(val) {
            this.getFLowsbyType(val);
        },
        
        calcCardLength(length){
            const intLength = length % 4 === 0;
            return intLength ? length / 4 : parseInt(length / 4 + 1);
        },
        
        // 根据流程类型加载对应的接口数据
        async getFLowsbyType(bizDate) {
            this.proTask = [];
            this.curTask = [];
            const flowDataRes = this.$api.elecProcessApi.queryExecRuTask({bizDate});
            const flowDataList = await this.$app.blockingApp(flowDataRes);
            if (flowDataList.data && flowDataList.data.length > 0) {
                let data = flowDataList.data;
                const carouselLength = this.calcCardLength(data.length);
                for(let i=0; i<carouselLength; i++){
                    const itemData = data.slice(i*4, i*4+4);
                    this.proTask.push(itemData);
                    if(!(this.curTask && this.curTask.taskId)){
                        this.curTask = data[0];
                        this.pieTitle = this.getPercentage(data[0].finishedRate)+'%';
                        this.flowType = data[0].flowType;
                        this.getFLowDetail(data[0].taskId, data[0].caseId, this.bizDate);
                    }
                }
            }else{
                this.proTask = [];
            }
        },
        
        // 选择流程-流程类型的取值字段更改 同步分支版本
        chooseTask(task){
            this.curTask = task;
            this.pieTitle = this.getPercentage(task.finishedRate)+'%';
            this.flowType = task.flowType;
            this.getFLowDetail(task.taskId, task.caseId, this.bizDate);
        },
        //查看详情
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
        
        getDetailColor(statusId){
            if(statusId === '01'){
                return '#D0D0D0';
            }else{
                return '#4A8EF0';
            }
        },
        
        // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
        async getFLowDetail(taskId, caseId, bizDate) {
            const flowDetailRes = this.$api.elecProcessApi.getExecProcessDetail({taskId, caseId, bizDate});
            const flowDetailStr = await this.$app.blockingApp(flowDetailRes);
            if (flowDetailStr.data) {
                const flowDetailParse = this.$utils.fromJson(flowDetailStr.data);
                this.stageList = flowDetailParse.stages;
                // 获取任务状态
                const completeNum = flowDetailParse.processCompleteNum;
                const targetNum = flowDetailParse.processTargetNum;
                const executePieData = [
                    {name: '已完成', value: completeNum},
                    {name: '未完成', value: (targetNum-completeNum)}
                ];
                this.executePieData = executePieData;
            }else{
                this.stageList = [];
                this.executePieData = [];
            }
        },
        
        closeTableDetail(){
            this.ifGridExpand = false;
        },
        
        // 纵向拉伸宽度问题处理
        dragColumnUpdate() {
            this.$refs.dragColumn.style.width = '100%';
        },
        
        stageDetailView(stage, error){
            const gridData = this.getStageData(stage, stage.ruCaseStepList);
            this.$refs.monitorLeader.setRowData(gridData);
            if(error){
                this.$refs.monitorLeader.gridController.gridApi.setFilterModel({stepStatus: {type: 'set', values: ['03','04']}})
            }
            this.ifGridExpand = true;
        },
        
        showStageError(stage){
            this.stageDetailView(stage, 'error')
        },
        
        // 展开表格显示详情
        getStageData(listInfo, ruCaseStepList){
            let tableArr = [];
            let orgHierarchy = [];
            let traverseArr = [];
            traverseArr = listInfo.children;
            return this.traverseData(traverseArr, orgHierarchy, tableArr, ruCaseStepList);
        },
        
        traverseData(arr, orgHierarchy, tableArr, ruCaseStepList){
            arr.forEach((groupItem)=>{
                let newHierarchy = [].concat(orgHierarchy);
                if(groupItem.defType === 'group'){
                    newHierarchy.push(groupItem.defName);
                    this.traverseData(groupItem.steps, newHierarchy, tableArr, ruCaseStepList);
                }else{
                    newHierarchy.push(groupItem.stepName);
                    const stepCode = groupItem.stepFormInfo.caseStepDef.stepCode;
                    let rowData = ruCaseStepList[stepCode];
                    rowData.orgHierarchy = newHierarchy;
                    tableArr.push(rowData);
                }
            });
            return tableArr;
        },

        // 表格详情是否全屏
        expandDetailFullScreen(status){
            this.ifDetailFullScreen = status;
            if(status){
                this.$refs.dragColumn.style.height = '100%';
            }else{
                this.$refs.dragColumn.style.height = '450px';
            }
        },

        // 开启刷新定时器
        async startFreshInterval(ifAsk){
            if(ifAsk){
                const ok = await this.$msg.ask('是否开启定时刷新？');
                if (!ok) {
                    return
                }
                this.ifIntervalStart = true;
            }
            const intervalMin = this.intervalMin*60*1000;
            this.freshInterval = setInterval(() => {
                this.getFLowsbyType(this.bizDate);
            }, intervalMin);
        },

        // 关闭刷新定时器
        async clearFreshInterval(ifAsk){
            if(ifAsk){
                const ok = await this.$msg.ask('是否关闭定时刷新？');
                if (!ok) {
                    return
                }
                this.ifIntervalStart = false;
            }
            clearInterval(this.freshInterval);
        },

        // 定时频率选择
        async chooseIntervalMin(chooseMin){
            const ok = await this.$msg.ask(`是否切换刷新频率为${chooseMin}分钟？`);
            if (!ok) {
                return
            }
            this.clearFreshInterval();
            this.intervalMin = chooseMin;
            if(this.ifIntervalStart){
                this.startFreshInterval();
            }
            this.$msg.success('刷新频率设置成功！');
        },

        outsideClick(){
            this.intervalListShow = false;
        },

        // 查看指标详情
        showIndexDetail(params) {
            const row = params.data;
            this.$drawerPage.create({
                className: 'elec-dashboard-drawer',
                width: 'calc(97% - 215px)',
                title: [row.stepName],
                component: 'monitor-detail-page',
                args: {stepCode: row.stepCode, stepActKey: row.stepActKey, bizDate: this.bizDate, status: 3},
                cancelButtonTitle: '返回',
                okButtonVisible: false
            });
        },
    }
}
</script>