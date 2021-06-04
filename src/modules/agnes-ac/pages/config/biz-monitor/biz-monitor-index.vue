<template>
    <div class="monitor-pages product-monitor">
        <div class="monitor-container">
            <div class="monitor-container-left">
                <complex-widget
                    :tree-data="treeData"
                    :manage-tree-data="treeData"
                    :showCheckbox="true"
                    @manageCheckNodes="manageCheckNodes"
                    :treeOptions="treeOptions"></complex-widget>
            </div>
            <div class="monitor-container-right">
                <el-form class="search-panel" label-width="70px">
                    <div class="line">
                        <el-form-item label="业务日期">
                          <div class="line">
                            <!--                                <el-date-picker-->
                            <!--                                        v-model="bizDateStart"-->
                            <!--                                        align="left"-->
                            <!--                                        type="date"-->
                            <!--                                        value-format="yyyy-MM-dd"-->
                            <!--                                        placeholder="选择日期">-->
                            <!--                                </el-date-picker>-->
                            <!--                                <span style="margin: 0 5px">至</span>-->
                            <!--                                <el-date-picker-->
                            <!--                                        v-model="bizDateEnd"-->
                            <!--                                        align="left"-->
                            <!--                                        type="date"-->
                            <!--                                        value-format="yyyy-MM-dd"-->
                            <!--                                        placeholder="选择日期">-->
                            <!--                                </el-date-picker>-->
                            <el-date-picker
                                v-model="dateTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="changeDateTime">
                            </el-date-picker>
                          </div>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="pagescroll">
                    <div class="elec-process">
                        <section class="module-container">
                            <section class="section">
                                <div class="section-title">业务事件流程</div>
                                <div class="card-container new-style double" :style="{height: foldEventContainer ? '185px' : 'auto'}">
                                    <div v-for="bizItem in bizEventData" :key="bizItem.pkId">
                                      <div class="card-item" @click="showDetail(diaryItem)">
                                        <div class="card-left">
                                          <p class="title">
                                            <span clas="name">{{ bizItem.taskName }}</span>
                                            <span class="status"
                                                  :class="getStatusKey(bizItem.taskStatus)">{{ tagStatus[bizItem.taskStatus] }}</span>
                                          </p>
                                          <div class="content">
                                            <div><span>{{ getBizType(bizItem.bizType) }}</span>
                                              <p style="margin: 0 8px;border-right: 1px solid #666"></p>
                                              <span>{{ getBizTag(bizItem.bizTag) }}</span>
                                            </div>
                                                    <div><span>{{bizItem.dateTime}}</span></div>
                                                </div>
                                            </div>
                                            <div class="card-right">
                                                <el-progress class="define-progress"
                                                             type="circle"
                                                             :percentage="getPercentage(bizItem.percentage)"
                                                             :color="getStatusColor('02')"
                                                             :style="{color: getStatusColor('02')}"
                                                             :width="72"
                                                             :stroke-width="10"
                                                ></el-progress>
                                                <div class="stage-item-title">完成进度</div>
                                            </div>
                                        </div>
                                      <div class="bottom">
                                        <el-button size="mini" @click="commitTask(bizItem)">强制通过</el-button>
                                        <!--                                            <el-button size="mini">重新执行</el-button>-->
                                      </div>
                                    </div>
                                </div>
                                <p class="fold-arrow" v-if="bizEventData.length>2" @click="foldEventContainer = !foldEventContainer">
                                    <em class="iconfont icon-double-arrow-down" v-if="foldEventContainer"></em>
                                    <em class="iconfont icon-double-arrow-up" v-else></em>
                                </p>
                            </section>
                            <section class="section">
                                <div class="section-title">日常作业流程</div>
                                <div class="card-container new-style double" :style="{height: foldWorkContainer ? '185px' : 'auto'}">
                                    <div v-for="diaryItem in diaryWorkData" :key="diaryItem.pkId">
                                      <div class="card-item" @click="showDetail(diaryItem)">
                                        <div class="card-left">
                                          <p class="title">
                                            <span clas="name">{{ diaryItem.taskName }}</span>
                                            <span class="status"
                                                  :class="getStatusKey(diaryItem.taskStatus)">{{ tagStatus[diaryItem.taskStatus] }}</span>
                                          </p>
                                          <div class="content">
                                            <div><span>{{ getBizType(diaryItem.bizType) }}</span>
                                              <p style="margin: 0 8px;border-right: 1px solid #666"></p>
                                              <span>{{ getBizTag(diaryItem.bizTag) }}</span>
                                            </div>
                                                    <div><span>{{diaryItem.dateTime}}</span></div>
                                                </div>
                                            </div>
                                            <div class="card-right">
                                                <el-progress class="define-progress"
                                                             type="circle"
                                                             :percentage="getPercentage(diaryItem.percentage)"
                                                             :color="getStatusColor('02')"
                                                             :style="{color: getStatusColor('02')}"
                                                             :width="72"
                                                             :stroke-width="10"
                                                ></el-progress>
                                                <div class="stage-item-title">完成进度</div>
                                            </div>
                                        </div>
                                      <div class="bottom">
                                        <el-button size="mini" @click="commitTask(diaryItem)">强制通过</el-button>
                                        <!--                                            <el-button size="mini">重新执行</el-button>-->
                                      </div>
                                    </div>
                                </div>
                                <p class="fold-arrow" v-if="diaryWorkData.length>2" @click="foldWorkContainer = !foldWorkContainer">
                                    <em class="iconfont icon-double-arrow-down" v-if="foldWorkContainer"></em>
                                    <em class="iconfont icon-double-arrow-up" v-else></em>
                                </p>
                            </section>
                            <section class="section risk">
                                <div class="section-title red">
                                    <span>风险事项</span>
                                </div>
                                <div class="card-container new-style">
                                    <div class="card-item">
                                        <div class="card-right">
                                            <el-progress class="define-progress"
                                                         type="circle"
                                                         :percentage="getPercentage(riskNum.percentage)"
                                                         :color="getStatusColor('02')"
                                                         :style="{color: getStatusColor('02')}"
                                                         :width="72"
                                                         :stroke-width="10"
                                            ></el-progress>
                                            <div class="stage-item-title">处理进度</div>
                                        </div>
                                        <div class="card-left">
                                            <p class="risk-item" v-for="riskItem in riskNumArr" :key="riskItem.key">
                                                <label>{{riskItem.label}}</label>
                                                <span :style="{color: riskItem.color}">{{riskNum[riskItem.key]}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </div>
        </div>
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
                        <el-button class="return-btn" size="mini" @click="closeTableDetail">返回</el-button>
                    </template>
                    <template slot="right-before">
                        <span class="full-screen-btn">
                            <em class="iconfont icon-expansion" v-show="!ifDetailFullScreen" @click="expandDetailFullScreen(true)"></em>
                            <em class="iconfont icon-expansion" v-show="ifDetailFullScreen" @click="expandDetailFullScreen(false)"></em>
                        </span>
                    </template>
                </gf-grid>
            </div>
        </div>
    </div>
</template>

<script>
//import {bizEventData, diaryWorkData, riskNum} from './data'
    export default {
      watch: {
        queryArgs: {
          handler() {
            this.initTask();
          },
          deep: true
        },
      },
      data() {
        return {
          treeData: [],
          bizEventData: [],
          diaryWorkData: [],
          riskNum: [],
          bizTypeDic: this.$app.dict.getDictItems('AGNES_BIZ_CASE'),
          bizTagDic: this.$app.dict.getDictItems('AGNES_BIZ_TAG'),
          tagStatus: {
            '01': '未开始',    // 未开始
            '02': '进行中',    // 执行中
            '03': '存在异常',    // 已异常
            '04': '超时',    // 已超时
            '06': '已完成',    // 已完成
            '07': '强制通过',    // 干预通过
          },
          foldEventContainer: true,
          foldWorkContainer: true,
          riskNumArr: [
            {label: '风险事件总数', key: 'total', color: '#4A8EF0'},
            {label: '已处理件数', key: 'finishd', color: '#52C41C'},
            {label: '未处理件数', key: 'unfinishd', color: '#ccc'}],
          bizDateStart: '',
          bizDateEnd: '',
          queryArgs: {
            'startBizDate': window.bizDate,
            'endBizDate': window.bizDate,
            'businessScenarios': [],
            'businessGroups': [],
          },
          dateTime: [window.bizDate, window.bizDate],
          ifGridExpand: false,
          dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 'n'},
          ifDetailFullScreen: false,
          treeOptions: [{
            treeData: [],
            defaultProps: {
              showCheckbox: true
            },
            defaultActions: {
              'check': this.oneTreeNodeClickTwo
            }
          }, {
            treeData: [],
            defaultProps: {
              showCheckbox: true
            },
            defaultActions: {
              'check': this.twoTreeNodeClickTwo
            }
          }]
        }
        },
        mounted() {
          this.initTree();
          this.initTask();
          this.initRisk();
        },
        methods: {
          async initTree() {
            const p = this.$api.bizMonitorApi.getTreeData("group");
            const resp = await this.$app.blockingApp(p);
            if (resp.data) {
              this.treeData = resp.data;
            }
          },
          async initRisk() {
            const p1 = this.$api.bizMonitorApi.getRisksSurvey();
            const resp1 = await this.$app.blockingApp(p1);
            if (resp1.data) {
              this.riskNum = resp1.data;
            }
          },
          async initTask() {
            this.bizEventData = [];
            this.diaryWorkData = [];
            const p = this.$api.bizMonitorApi.queryProcessTasks(this.queryArgs);
            const resp = await this.$app.blockingApp(p);
            if (resp && resp.data) {
              this.bizEventData = resp.data.bizEventData;
              this.diaryWorkData = resp.data.diaryWorkData;
            }
          },
          changeDateTime(param) {
            this.queryArgs.startBizDate = ''
            this.queryArgs.endBizDate = ''
            if (param !== null) {
              this.queryArgs.startBizDate = param[0];
              this.queryArgs.endBizDate = param[1];
            }
          },
          getPercentage(percentage) {
            return parseInt(percentage * 100);
          },

          getStatusColor(statusId) {
            const stepStatus = this.$agnesAcUtils.getStepStatusMap();
            return stepStatus.get(statusId).color;
          },

          getStatusKey(statusId) {
            const stepStatus = this.$agnesAcUtils.getStepStatusMap();
            return stepStatus.get(statusId).icon;
          },

          closeTableDetail() {
            this.ifGridExpand = false;
          },
          async commitTask(params) {
            let taskCommit = {};
            taskCommit.caseId = params.caseId;
            taskCommit.bizDate = window.bizDate;
            const p1 = this.$api.OpCalendarApi.checkStepStatus(params.caseId, null);
            const resp1 = await this.$app.blockingApp(p1);
            if (resp1 && resp1.data === true) {
              const ok = await this.$msg.ask(`该任务下存在异常步骤,是否继续提交?`);
              if (!ok) {
                return
              }
            }
            try {
              const p2 = this.$api.OpCalendarApi.commitBatch(taskCommit)
              const resp2 = await this.$app.blockingApp(p2);
              if (resp2.data) {
                this.$msg.success('提交成功');
                this.reloadData()// 刷新页面数据
              } else {
                this.$msg.warning('提交失败');
              }
            } catch (e) {
              this.$msg.error(e);
            }
          },
          async showDetail(item) {
            let rowDate = [];
            const p = this.$api.bizMonitorApi.queryTsakStep(item.caseId, item.exeTime);
            const resp = await this.$app.blockingApp(p);
            if (resp && resp.data) {
              rowDate = resp.data;
            }
            this.$refs.monitorLeader.setRowData(rowDate);
            this.ifGridExpand = true;
          },
          getBizType(dictId) {
            if (dictId) {
              return this.$lodash.find(this.bizTypeDic, {dictId}).dictName
            }
            return ''
          },
          getBizTag(bizTag) {
            if (bizTag) {
              let Ids = bizTag.split(',');
              return Ids.map((dictId) => {
                const dictObj = this.$lodash.find(this.bizTagDic, {dictId});
                return dictObj ? dictObj.dictName : false;
              }).join(',');
            }
            return "";
          },

          // 纵向拉伸宽度问题处理
          dragColumnUpdate() {
            this.$refs.dragColumn.style.width = '100%';
          },

          // 表格详情是否全屏
          expandDetailFullScreen(status) {
            this.ifDetailFullScreen = status;
            if (status) {
              this.$refs.dragColumn.style.height = '100%';
            } else {
              this.$refs.dragColumn.style.height = '450px';
            }
          },
          // 弹框选择数据以后，赋值给组件树
          manageCheckNodes(val) {
            const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
            treeOptions[0].treeData = [val[0]];
            treeOptions[1].treeData = [val[1]];
            this.treeOptions = treeOptions;
          },

          // 首棵树点击事件
          oneTreeNodeClickTwo(nodeObj, nodeData) {
            let businessGroups = [];
            if (nodeData && nodeData.checkedKeys && nodeData.checkedKeys.length > 0) {
              nodeData.checkedKeys.forEach((item) => {
                businessGroups.push(item)
              })
            }
            this.queryArgs.businessGroups = businessGroups;
          },

          // 第二颗树勾选事件
          twoTreeNodeClickTwo(nodeObj, nodeData) {
            let businessScenarios = [];
            if (nodeData && nodeData.checkedNodes && nodeData.checkedNodes.length > 0) {
              nodeData.checkedNodes.forEach((item) => {
                businessScenarios.push(item.code)
              })
            }
            this.queryArgs.businessScenarios = businessScenarios;
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
              paramListStr: '',
            };
            taskCommit.stepInfo.remark = params.data.remark;
            taskCommit.stepInfo.stepStatus = "06";
            taskCommit.stepInfo.jobId = params.data.jobId;
            taskCommit.inst.taskId = params.data.taskId;
            taskCommit.stepInfo.stepCode = params.data.stepCode;
            taskCommit.stepInfo.bizDate = this.bizDate;
            taskCommit.stepInfo.caseId = params.data.caseId;
            taskCommit.paramListStr = JSON.stringify(params.data.paramList);
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
        }
    }
</script>

<style scoped>
    .monitor-pages {
        position: relative;
    }

    .monitor-container-right {
        overflow: initial;
    }

    .monitor-container-right .pagescroll {
        height: calc(100% - 48px);
        margin-left: 13px;
        padding-right: 25px;
        margin-right: -25px;
        overflow-y: auto;
    }

    .monitor-container-right .pagescroll .elec-process{
        height: auto;
    }

    .monitor-container-right .pagescroll section {
        flex-direction: column;
    }

    .ag-cell.link-option-cell:hover .ag-cell-value{
        cursor: pointer;
        text-decoration: underline;
    }

    .fold-arrow {
        margin-top: 12px;
        text-align: center;
        cursor: pointer;
    }

    .fold-arrow > .iconfont {
        color: #999;
    }

    .monitor-pages .elec-process{
        background: #F5F7FA;
        border-radius: 8px;
        padding: 16px;
    }

    .monitor-pages .section-title {
        width: 100%;
        color: #666;
        font-size: 18px;
        font-family: SourceHanSansCN-Medium;
        margin-bottom: 14px;
    }

    .monitor-pages .elec-process > .section {
        flex-direction: column;
    }

    .monitor-pages .elec-process > .section .section-title::before {
        display: block;
        position: absolute;
        content: '';
        width: 4px;
        height: 16px;
        background: #0f5eff;
        left: -10px;
        top: 7px;
        border-radius: 2px;
    }

    .monitor-pages .elec-process > .section .section-title.red::before {
        background: #F5222E;
    }

    .return-btn {
        color: #0f5eff;
        border-color: #0f5eff;
        padding: 6px 17px;
    }
</style>
