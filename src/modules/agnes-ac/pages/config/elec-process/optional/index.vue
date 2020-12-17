<template>
    <div class="elec-process" v-loading="loading">
        <section class="top-section">
            <div class="flow-type">
                <p class="section-label">流程类型</p>
                <el-select class="flow-type-select"
                           v-model="flowType"
                           clearable
                           size="mini"
                           @change="flowTypeChange"
                           style="width: 175px;margin-right: 12px;"
                >
                    <el-option v-for="type in flowTypeOp"
                               :key="type.typeId"
                               :label="type.typeName"
                               :value="type.typeId">
                    </el-option>
                </el-select>
            </div>
            <el-radio-group class="task-board" v-model="choosedTaskId" size="mini" @change="chooseTask">
                <el-radio v-for="task in proTask" :key="task.taskId" :label="task.taskId" :title="task.taskName"
                          border>
                    <em v-if="task.taskIcon" :class="task.taskIcon"></em>
                    <em v-else class="fa fa-cogs"></em>
                    <span>{{task.taskName}}</span>
                </el-radio>
            </el-radio-group>
            <div class="date-search">
                <p class="section-label">业务日期</p>
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
                <em class="el-icon-refresh" title="全部刷新" @click="freshFlowData(true)"></em>
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
        <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <em class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></em>
            </span>
            <div class="bottom left" id="taskContainerLeft">
                <div class="section-title">
                    <span>流程图</span>
                    <span v-if="currentTaskObj.taskName"> -- {{currentTaskObj.taskName}}</span>
                    <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                        <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                            <em class="fa fa-circle" :style="{color: statusColor}"></em>{{status}}
                        </span>
                    </div>
                </div>
                <div class="flow-container" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn"
                     :style="{height: ifGridExpand?'135px':'100%'}">
                    <div class="stage-item"
                         v-for="stage in taskStage"
                         :key="stage.defId"
                         :class="curStage.defId === stage.defId ? 'active' : ''"
                         @click="chooseTaskStage(stage)">
                        <div>
                            <el-progress class="define-progress"
                                         type="circle"
                                         :percentage="getPercentage(stage.percentage)"
                                         :color="getStatusColor(stage.status)"
                                         :width="56"
                                         :stroke-width="6"
                            ></el-progress>
                            <div class="stage-item-title" title="stage.defName">{{stage.defName}}</div>
                        </div>
                    </div>
                    <div class="drag-bar-line">
                        <p @click="ifGridExpand = !ifGridExpand">
                            <em class="fa fa-caret-down"></em>
                            <em class="fa fa-caret-up"></em>
                        </p>
                    </div>
                </div>
                <div v-show="ifGridExpand" class="drag-column">
                    <gf-grid ref="elecGrid" class="elec-grid"
                             :class="isBizDate ? 'isBizDate': ''"
                             height="100%"
                             grid-no="agnes-elec-process-field"
                             :options="elecGridOptions"
                    ></gf-grid>
                </div>
            </div>
            <div class="bottom right" v-show="ifRightExpand">
                <div class="chart-container">
                    <p class="section-title">任务进度</p>
                    <pie-chart ref="pieChart"
                               :chart-data="executePieData"
                               :title="pieTitle"
                               :color-set="['#0f5eff','#E0E0E0']"
                               style="width: 180px;margin: auto"
                    ></pie-chart>
                </div>
                <div class="exec-container">
                    <p class="section-title">
                        <span>执行情况</span>
                        <el-checkbox-group class="exec-type" v-model="execTypeChecked" size="small"
                                           @change="execTypeChange">
                            <el-checkbox v-for="exeType in execTypeOp" :key="exeType.id" :label="exeType.id" border>
                                <em v-html="lcImg[exeType.icon]"></em><span>{{exeType.label}}</span>
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

    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                lcImg: this.$lcImg,
                dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 's'},
                bizDate: '',
                flowType: '',
                flowTypeOp: [],
                flowTypeDict: [],
                currentTaskObj: {},
                choosedTaskId: '',
                proTask: [],
                executePieData: [],
                pieTitle: '',
                taskStage: [],
                execLog: [],
                ifRightExpand: false,
                ifGridExpand: true,
                curStage: {},
                stageStatus: {
                    '#DFE1E5': '未开始',
                    '#4A8EF0': '执行中',
                    '#F5222E': '已异常/已超时',
                    '#FAAE14': '干预通过',
                    '#52C41C': '已完成'
                },
                freshInterval: null,
                ifIntervalStart: true,
                intervalMin: 1,
                intervalList: [{label: '1分钟', value: 1}, {label: '3分钟', value: 3}, {label: '5分钟', value: 5}],
                intervalListShow: false,
                execTypeChecked: ['OVERTIME', 'EXCEPTION'],
                execTypeOp: [{id: 'AHEAD', label: '提前', icon: 'executing'}, {
                    id: 'FINISHED',
                    label: '完成',
                    icon: 'finish'
                },
                    {id: 'OVERTIME', label: '超时', icon: 'outTime'}, {id: 'EXCEPTION', label: '异常', icon: 'abnormal'}
                ],
                taskIdList: [],
                loading: false,
                elecGridOptions: {
                    onRowDataChanged: (params) => {
                        params.columnApi.columnController.autoSizeAllColumns()
                    }
                }
            }
        },
        created() {
            // 默认系统业务日期
            this.bizDate = window.bizDate;
            // 默认加载首个流程类型流程数据
            this.flowTypeDict = this.$app.dict.getDictItems("AGNES_CASE_FLOWTYPE").map((dictItem) => {
                return {
                    typeId: dictItem.dictId,
                    typeName: dictItem.dictName
                }
            });
            this.getAllFlow(this.bizDate);
            this.startFreshInterval();
        },
        beforeDestroy() {
            this.clearFreshInterval();
        },
        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (from.path === '/agnes.elec.operate') {
                    this.clearFreshInterval();
                }
                if (to.path === '/agnes.elec.operate') {
                    if(this.ifIntervalStart) {
                        this.startFreshInterval();
                    }
                }
            }
        },

        computed: {
            isBizDate() {
                return this.bizDate && this.bizDate === window.bizDate;
            }
        },
        methods: {
            // 获取所有流程数据
            async getAllFlow(bizDate) {
                const flowDataList = await this.$api.elecProcessApi.getTaskByType(bizDate);
                if (flowDataList.data && flowDataList.data.length > 0) {
                    this.flowTypeOp = this.getNeedFlowType(flowDataList.data);
                    this.flowType = this.flowTypeOp[0].typeId;
                    this.proTask = this.flowTypeOp[0].proTask;
                    // 默认加载第一项流程数据
                    this.choosedTaskId = this.proTask[0].taskId;
                    this.currentTaskObj = this.proTask[0];
                    this.getFLowDetail(this.proTask[0].taskId, bizDate, true);
                } else {
                    this.flowType = '';
                    this.flowTypeOp = [];
                    this.proTask = [];
                    this.taskStage = [];
                    this.executePieData = [];
                    this.pieTitle = '';
                    this.execLog = [];
                    this.setGridData([]);
                }
            },


            getNeedFlowType(flowDataList) {
                const flowTypeOp = this.$lodash.cloneDeep(this.flowTypeDict);
                flowDataList.forEach((dataItem) => {
                    const dataIndex = this.$lodash.findIndex(flowTypeOp, {typeId: dataItem.flowType});
                    if (flowTypeOp[dataIndex]) {
                        if (!flowTypeOp[dataIndex].proTask) {
                            flowTypeOp[dataIndex].proTask = [];
                        }
                        flowTypeOp[dataIndex].proTask.push(dataItem);
                    }
                });
                return flowTypeOp.filter((flowItem) => {
                    return flowItem.proTask && flowItem.proTask.length > 0;
                })
            },

            // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
            async getFLowDetail(taskId, bizDate, ifLoading) {
                if (ifLoading) {
                    this.loading = true;
                }
                try {
                    const flowDetailStr = await this.$api.elecProcessApi.getExecProcessBrief({taskId, bizDate});
                    if (flowDetailStr.data) {
                        const flowDetailParse = this.$utils.fromJson(flowDetailStr.data);
                        if (flowDetailParse && flowDetailParse.stages.length > 0) {
                            this.taskStage = flowDetailParse.stages;
                            if (this.curStage && this.curStage.defId) {
                                const hasStage = this.$lodash.find(flowDetailParse.stages, {defId: this.curStage.defId});
                                if (hasStage) {
                                    this.curStage = hasStage;
                                } else {
                                    this.curStage = flowDetailParse.stages[0];
                                }
                            } else {
                                this.curStage = flowDetailParse.stages[0];
                            }
                            // 获取任务状态
                            const targetNum = flowDetailParse.processCompleteNum;
                            const allTaskNum = flowDetailParse.processTargetNum;
                            const executePieData = [
                                {name: '完成', value: targetNum},
                                {name: '未完成', value: (allTaskNum - targetNum)}
                            ];
                            this.executePieData = executePieData;
                            this.pieTitle = Math.floor(targetNum / allTaskNum * 100) + '%';

                            // 获取执行情况
                            this.taskIdList = flowDetailParse.taskIdList;
                            this.getExecuteData(flowDetailParse.taskIdList, this.execTypeChecked);
                            if (this.curStage && this.curStage.ruCaseStepList) {
                                this.setGridData(this.curStage.ruCaseStepList);
                            }
                            this.loading = false;
                        } else {
                            this.taskStage = [];
                            this.executePieData = [];
                            this.taskIdList = [];
                            this.loading = false;
                        }
                    } else {
                        this.taskStage = [];
                        this.executePieData = [];
                        this.execLog = [];
                        this.setGridData([]);
                        this.loading = false;
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 流程类型切换
            flowTypeChange(val) {
                this.curStage = {};
                this.proTask = this.$lodash.find(this.flowTypeOp, {typeId: val}).proTask;
                // 默认加载第一项流程数据
                this.choosedTaskId = this.proTask[0].taskId;
                this.currentTaskObj = this.proTask[0];
                this.getFLowDetail(this.proTask[0].taskId, this.bizDate, true);
            },

            // 任务流程 -- 选择
            chooseTask(taskId) {
                this.curStage = {};
                this.getFLowDetail(taskId, this.bizDate, true);
                this.currentTaskObj = this.$lodash.find(this.proTask, {taskId});
                this.choosedTaskId = taskId;
            },

            // 任务流程 -- 指定stage -- 选择
            chooseTaskStage(stage) {
                this.curStage = stage;
                if (stage.ruCaseStepList) {
                    this.setGridData(stage.ruCaseStepList);
                }
            },

            // 表格数据塞入
            setGridData(data) {
                this.$refs.elecGrid.setRowData(data);
            },

            // 业务日期切换
            bizDateChange(val) {
                this.getAllFlow(val);
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

            getPercentage(percentage) {
                return parseInt(percentage * 100);
            },

            getStatusColor(statusId) {
                const stepStatus = this.$agnesAcUtils.getStepStatusMap();
                return stepStatus.get(statusId).color;
            },

            // 重新执行
            reExecute(params) {
                const rowData = params.data;
                let kpiTaskReq = {}
                kpiTaskReq.caseId = rowData.caseId;
                kpiTaskReq.stepCode = rowData.stepCode;
                kpiTaskReq.bizDate = this.bizDate;
                kpiTaskReq.taskId = rowData.taskId;
                this.$api.kpiDefineApi.execTask(kpiTaskReq).then((resp) => {
                    if (resp.data.status) {
                        this.$msg.success("重新执行成功");
                        this.freshFlowData(false);
                    } else {
                        this.$msg.error("操作失败");
                    }
                });
            },

            // 手工确认
            async actionConfirm(params) {
                let taskCommit = {
                    stepInfo: {},
                    inst: {
                        taskId: "",
                    },
                };
                taskCommit.stepInfo.remark = params.data.remark;
                taskCommit.stepInfo.stepStatus = "06";
                taskCommit.stepInfo.jobId = params.data.jobId;
                taskCommit.inst.taskId = params.data.taskId;
                taskCommit.stepInfo.stepCode = params.data.stepCode;
                taskCommit.stepInfo.bizDate = this.bizDate;
                taskCommit.stepInfo.caseId = params.data.caseId;
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.freshFlowData(false); // 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 干预通过
            async forcePass(params) {
                let taskCommit = {
                    stepInfo: {},
                    inst: {
                        taskId: "",
                    },
                };

                taskCommit.stepInfo.remark = params.data.remark;
                taskCommit.stepInfo.stepStatus = "07";
                taskCommit.stepInfo.jobId = params.data.jobId;
                taskCommit.inst.taskId = params.data.taskId;
                taskCommit.stepInfo.stepCode = params.data.stepCode;
                taskCommit.stepInfo.bizDate = this.bizDate;
                taskCommit.stepInfo.caseId = params.data.caseId;
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.freshFlowData(false); // 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 查看指标详情
            showIndexDetail(params) {
                const row = params.data;
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(100% - 250px)',
                    title: [row.stepName],
                    component: 'monitor-detail-page',
                    args: {stepCode: row.stepCode, stepActKey: row.stepActKey, bizDate: this.bizDate, status: 3},
                    cancelButtonTitle: '返回',
                    okButtonVisible: false
                });
            },

            // 获取任务进度
            getTaskScheduler() {
                let executePieData = [];
                let completeCnt = Math.floor(Math.random() * 100);
                let uncompleteCnt = 100 - completeCnt;
                executePieData = [
                    {name: '完成', value: completeCnt},
                    {name: '未完成', value: uncompleteCnt}
                ];
                this.executePieData = executePieData;
            },

            // 获取执行情况
            async getExecuteData(taskIds, msgType) {
                const resp = await this.$api.elecProcessApi.getMsgNameAndType({taskIds, msgType});
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

            freshFlowData(ifLoading) {
                this.getFLowDetail(this.choosedTaskId, this.bizDate, ifLoading);
            },

            getExecIcon(status) {
                const icon = this.$lodash.find(this.execTypeOp, {id: status}).icon;
                return this.lcImg[icon];
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
                    if (!this.loading) {
                        this.freshFlowData(true);
                    }
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
            }
        },
    }
</script>

<style>
    .elec-process.gf-tab-view .el-loading-mask {
        z-index: inherit;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .elec-process .elec-grid:not(.isBizDate) .optional-cell .el-button:not(.detail-btn) {
        display: none;
    }
</style>
