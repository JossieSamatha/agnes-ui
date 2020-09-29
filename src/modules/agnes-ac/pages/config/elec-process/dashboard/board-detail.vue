<template>
    <div class="elec-process board-detail">
        <div class="full-screen-btn">
            <i v-show="!ifFullScreen" v-html="lcImg.fullScreen" @click="expandFullScreen(true)"></i>
            <i v-show="ifFullScreen" v-html="lcImg.exitFullScreen" @click="expandFullScreen(false)"></i>
        </div>
        <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <i class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></i>
            </span>
            <div class="bottom left">
                <div class="section-title">
                    <span>流程图</span>
                    <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                        <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                            <i class="fa fa-circle"
                               :style="{color: statusColor}"
                            ></i>{{status}}
                        </span>
                    </div>
                </div>
                <div class="flow-container" style="height: 100%">
                    <stageList class="lifeRecycle" :stageList="taskStage" :preview="true" @showTableDetail="showTableDetail"></stageList>
                </div>
                <div v-show="ifGridExpand" class="drag-column" id="taskContainerLeft">
                    <div class="close-container">
                        <i class="el-icon-circle-close" @click="closeTableDetail"></i>
                    </div>
                    <div class="drag-container" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn">
                        <gf-grid ref="monitorLeader"
                                 height="100%"
                                 grid-no="agnes-monitor-leader-field"
                        ></gf-grid>
                    </div>
                </div>
            </div>
            <div class="bottom right" v-show="ifRightExpand">
                <div class="chart-container">
                    <p class="section-title">任务进度</p>
                    <pie-chart ref="pieChart" :chart-data="executePieData"
                               :color-set="['#476DBE','#E0E0E0']"></pie-chart>
                </div>
                <div class="exec-container">
                    <p class="section-title">
                        <span>执行情况</span>
                        <el-checkbox-group class="exec-type" v-model="execTypeChecked" size="small" @change="execTypeChange">
                            <el-checkbox v-for="exeType in execTypeOp" :key="exeType.id" :label="exeType.id" border>
                                <i v-html="lcImg[exeType.icon]"></i><span>{{exeType.label}}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </p>
                    <ul class="exec-ul">
                        <li class="exec-li"
                            v-for="execItem in execLog"
                            :key="execItem.id"
                            :class="[execItem.status, execItem.expand]"
                            @dblclick="expandMore(execItem)"
                        >
                            <span v-html="getExecIcon(execItem.status)"></span>
                            <span>{{execItem.content}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import stageList from './stage-list'

    export default {
        props: {
            bizDate: {type: String, require: true},
            task: {type: Object, require: true}
        },
        data() {
            return {
                svgImg: this.$svgImg,
                lcImg: this.$lcImg,
                dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 'n'},
                executePieData: [],
                taskStage: [],
                execLog: [],
                ifRightExpand: false,
                ifGridExpand: false,
                stageStatus: {
                    '#DFE1E5': '未开始',
                    '#4A8EF0': '执行中',
                    '#F5222E': '有异常/已超时',
                    '#FAAE14': '干预通过',
                    '#52C41C': '已完成'
                },
                freshInterval: null,
                execTypeChecked: ['OVERTIME', 'EXCEPTION'],
                execTypeOp: [{id: 'AHEAD', label: '提前', icon: 'executing'},
                    {id: 'LAUNCH', label: '启动', icon: 'executing'}, {id: 'FINISHED', label: '完成', icon: 'finish'},
                    {id: 'OVERTIME', label: '超时', icon: 'outTime'}, {id: 'EXCEPTION', label: '异常', icon: 'abnormal'}
                ],
                ifFullScreen: false,
                taskIdList: []
            }
        },
        components: {
            stageList
        },
        created() {
            this.getFLowDetail(this.task.taskId, this.task.caseId, this.bizDate);
        },
        beforeDestroy() {
            clearInterval(this.freshInterval);
        },
        methods: {
            // 全屏展开操作
            expandFullScreen(status){
                this.ifFullScreen = status;
                this.$emit('fullScreenOption', this.ifFullScreen);
            },

            // 返回关闭抽屉;
            onCancel(){
                this.$emit("onClose");
            },

            // 刷新页面数据
            onSave(){
                this.getFLowDetail(this.task.taskId, this.task.caseId, this.bizDate);
            },

            // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
            async getFLowDetail(taskId, caseId, bizDate) {
                const flowDetailRes = this.$api.elecProcessApi.getExecProcessDetail({taskId, caseId, bizDate});
                const flowDetailStr = await this.$app.blockingApp(flowDetailRes);
                if (flowDetailStr.data) {
                    const flowDetailParse = this.$utils.fromJson(flowDetailStr.data);
                    this.taskStage = flowDetailParse.stages;
                    // 获取任务状态
                    const completeNum = flowDetailParse.processCompleteNum;
                    const targetNum = flowDetailParse.processTargetNum;
                    const executePieData = [
                        {name: '完成', value: completeNum},
                        {name: '未完成', value: (targetNum-completeNum)}
                    ];
                    this.executePieData = executePieData;
                    // 获取执行情况
                    this.taskIdList = flowDetailParse.taskIdList;
                    this.getExecuteData(flowDetailParse.taskIdList, this.execTypeChecked);
                }else{
                    this.taskStage = [];
                    this.executePieData = [];
                    this.taskIdList = [];
                }
            },

            showTableDetail(gridData){
                this.ifGridExpand = true;
                this.setGridData(gridData);
            },

            closeTableDetail(){
                this.ifGridExpand = false;
            },

            // 表格数据塞入
            setGridData(data) {
                this.$refs.monitorLeader.setRowData(data);
            },

            // 展开/收起底部右侧
            foldBottomRight() {
                this.ifRightExpand = !this.ifRightExpand;
                this.$nextTick(() => {
                    if (this.ifRightExpand) {
                        this.$refs.pieChart.pieChart.resize()
                    }
                });
            },

            // 纵向拉伸宽度问题处理
            dragColumnUpdate() {
                this.$refs.dragColumn.style.width = '100%';
            },

            // 点击展开更多日志信息
            expandMore(execItem) {
                if (!execItem.expand) {
                    this.$set(execItem, 'expand', 'expand');
                } else {
                    execItem.expand = '';
                }
            },

            // 获取执行情况
            async getExecuteData(taskIds, msgType) {
                const resp = this.$api.elecProcessApi.getMsgNameAndType({taskIds, msgType})
                if (resp.data) {
                    this.execLog = resp.data;
                } else {
                    this.execLog = [];
                }
            },

            // 执行情况类型切换
            execTypeChange(val) {
                this.getExecuteData(this.taskIdList, val);
            },

            getExecIcon(status) {
                const icon = this.$lodash.find(this.execTypeOp, {id: status}).icon;
                return this.lcImg[icon];
            }
        }
    }
</script>
