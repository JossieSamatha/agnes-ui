<template>
    <div class="elec-process">
        <section class="top-section">
            <div class="flowType">
                <p class="section-label">流程类型</p>
                <gf-dict class="flow-type-select"
                         clearable
                         dict-type="AGNES_CASE_FLOWTYPE"
                         size="mini"
                         v-model="flowType"
                         @change="flowTypeChange"
                         style="width: 175px;margin-right: 12px;"/>
                <el-radio-group class="task-board" v-model="choosedTaskId" size="mini" @change="chooseTask">
                    <el-radio v-for="task in proTask" :key="task.taskId" :label="task.taskId" :title="task.taskName"
                              border>
                        <i :class="task.icon"></i>
                        <span>{{task.taskName}}</span>
                    </el-radio>
                </el-radio-group>
            </div>
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
                <i class="el-icon-refresh" title="全部刷新" @click="freshFlowData()"></i>
            </div>
        </section>
        <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <i class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></i>
            </span>
            <div class="bottom left" id="taskContainerLeft">
                <div class="section-title">
                    <span>流程图</span>
                    <span v-if="currentTaskObj.taskName"> -- {{currentTaskObj.taskName}}</span>
                    <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                        <span v-for="status in stepStatus" :key="status.dictId">
                            <i class="fa fa-circle"
                               :style="{color: status.color}"
                            ></i>{{status.dictName}}
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
                            <i class="fa fa-caret-down"></i>
                            <i class="fa fa-caret-up"></i>
                        </p>
                    </div>
                </div>
                <div v-show="ifGridExpand" class="drag-column">
                    <gf-grid ref="elecGrid"
                             height="100%"
                             grid-no="agnes-elec-process-field"
                    ></gf-grid>
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
                        <el-checkbox-group class="execType" v-model="execTypeChecked" size="small">
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
                            <span v-html="lcImg[execItem.status]"></span>
                            <span>{{execItem.content}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import mockData from "../mockData";

    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                lcImg: this.$lcImg,
                dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 's'},
                bizDate: '',
                flowType: '',
                currentTaskObj: {},
              choosedTaskId: '',
              proTask: [],
              executePieData: [],
              taskStage: [],
              execLog: mockData().execLog,
              ifRightExpand: false,
              ifGridExpand: true,
              curStage: {},
              stepStatus: [],
              freshInterval: null,
              execTypeChecked: ['OVERTIME', 'EXCEPTION'],
              execTypeOp: [{id: 'AHEAD', label: '提前', icon: 'executing'}, {
                id: 'LAUNCH',
                label: '启动',
                icon: 'executing'
              },
                {id: 'FINISHED', label: '完成', icon: 'finish'},
                {id: 'OVERTIME', label: '超时', icon: 'outTime'}, {id: 'EXCEPTION', label: '异常', icon: 'abnormal'}]
            }
        },
        created() {
            this.stepStatus = this.$agnesAcUtils.getStepStatusMap();
            // 默认系统业务日期
            this.bizDate = window.bizDate;
            // 默认加载首个流程类型流程数据
            const flowTypeDicts = this.$app.dict.getDictItems("AGNES_CASE_FLOWTYPE");
            if (flowTypeDicts.length > 0 && flowTypeDicts[0].dictId) {
                this.flowType = flowTypeDicts[0].dictId;
                this.getFLowbyType(flowTypeDicts[0].dictId);
            }
            this.freshInterval = setInterval(() => {
                this.freshFlowData();
            }, 60000);
        },
        beforeDestroy() {
            clearInterval(this.freshInterval);
        },
        methods: {
            // 根据流程类型加载对应流程数据
            async getFLowbyType(firstFlowType) {
                const flowDataRes = this.$api.elecProcessApi.getTaskByType({"flowType": firstFlowType});
                const flowDataList = await this.$app.blockingApp(flowDataRes);
                if (flowDataList.data && flowDataList.data.length > 0) {
                    this.proTask = flowDataList.data;
                    // 默认加载第一项流程数据
                    this.choosedTaskId = this.proTask[0].taskId;
                    this.currentTaskObj = this.proTask[0];
                    this.getFLowDetail(this.proTask[0].taskId, this.bizDate);
                } else {
                    this.proTask = [];
                    this.taskStage = [];
                }
            },

            // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
            async getFLowDetail(taskId, bizDate) {
                try {
                    const flowDetailRes = this.$api.elecProcessApi.getExecProcessDetail({taskId, bizDate});
                    const flowDetailStr = await this.$app.blockingApp(flowDetailRes);
                    if (flowDetailStr.data) {
                        const flowDetailParse = this.$utils.fromJson(flowDetailStr.data);
                        if (flowDetailParse && flowDetailParse.stages.length > 0) {
                            this.taskStage = flowDetailParse.stages;
                            this.curStage = flowDetailParse.stages[0];
                            // 获取任务状态
                            const allTaskNum = flowDetailParse.processCompleteNum;
                            const targetNum = flowDetailParse.processTargetNum;
                            const executePieData = [
                                {name: '完成', value: targetNum},
                                {name: '未完成', value: (allTaskNum-targetNum)}
                            ];
                            this.executePieData = executePieData;
                          // 获取执行情况
                          //this.getExecuteData(flowDetailParse.taskIdList, this.execTypeChecked);
                            this.setGridData(flowDetailParse.stages[0].ruCaseStepList);
                        } else {
                            this.taskStage = [];
                        }
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 流程类型切换
            flowTypeChange(val) {
                this.getFLowbyType(val);
            },

            // 任务流程 -- 选择
            chooseTask(taskId) {
                this.getFLowDetail(taskId, this.bizDate);
                this.currentTaskObj = this.$lodash.find(this.proTask, {taskId});
                this.choosedTaskId = taskId;
            },

            // 任务流程 -- 指定stage -- 选择
            chooseTaskStage(stage) {
                this.curStage = stage;
                this.setGridData(stage.ruCaseStepList);
            },

            // 表格数据塞入
            setGridData(data) {
                this.$refs.elecGrid.setRowData(data);
                this.$refs.elecGrid.gridController.columnApi.columnController.autoSizeFitColumns();
            },

            // 业务日期切换
            bizDateChange(val) {
                this.getFLowDetail(this.choosedTaskId, val);
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
                return parseFloat(percentage) * 100;
            },

            getStatusColor(statusId) {
                const color = this.$lodash.find(this.stepStatus, {dictId: statusId}).color;
                return color;
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
                    if (resp.status) {
                        this.$message.success(resp.message);
                        this.freshFlowData();
                    } else {
                        this.$message.error(resp.message);
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
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.freshFlowData(); // 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 强制通过
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
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.freshFlowData(); // 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
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
            async getExecuteData(taskIds, msgType){
                const p = this.$api.elecProcessApi.getMsgNameAndType({taskIds, msgType})
                const resp = await this.$app.blockingApp(p);
                if (resp.data) {
                  this.execLog = resp.data;
                }
            },

            freshFlowData() {
                this.getFLowDetail(this.choosedTaskId, this.bizDate);
            }
        }
    }
</script>
