<template>
    <div class="datavPage workbench detail-page">
        <module-card>
            <template slot="content">
                <el-radio-group class="stage-list" v-model="curStageId" @change="changeStage">
                  <el-radio-button class="stage-item" v-for="stageItem in stageList" :key="stageItem.pkId"
                                   :label="stageItem.pkId">
                    {{ stageItem.stageName }}
                  </el-radio-button>
                </el-radio-group>
            </template>
        </module-card>
        <module-card title="阶段详情">
            <template slot="content">
              <el-form label-width="80px" class="infoForm" size="mini">
                <div class="line">
                  <el-form-item label="当前阶段" prop="stageName">
                    <span>{{ curStage.stageName }}</span>
                  </el-form-item>
                  <el-form-item label="产品名称" prop="productName">
                    <span>{{ curStage.productName }}</span>
                  </el-form-item>
                </div>
                <div class="line">
                  <el-form-item label="任务区间" prop="">
                    <span>{{ getDateTime(curStage) }}</span>
                  </el-form-item>
                  <el-form-item label="产品阶段" prop="">
                    <span>{{ getProductStage(curStage.productStage) }}</span>
                  </el-form-item>
                </div>
              </el-form>
            </template>
        </module-card>
        <module-card title="完成情况" class="flex-conent">
            <template slot="content">
                <div class="ratio-slider">
                  <el-slider v-model="percentage"
                             :min="0"
                             :max="100"
                             :show-tooltip="false"
                             height="2px"
                             :disabled="true">
                    >
                  </el-slider>
                  <span class="ratio-slider-value"
                        :style="{'left': getRatioLeft}">{{ this.percentage }}%</span>
                </div>
              <gf-grid ref="subTaskGrid" grid-no="agnes-elec-process-field" height="calc(100% - 34px)"></gf-grid>
            </template>
        </module-card>
    </div>
</template>

<script>
    export default {
        props: {
            row: {
                type: Object,
                required: true
            },
            mode: {
                type: String,
                default: 'view'
            },
        },
        data() {
            return {
              curStage: {},
              curStageId: '00',
              stageList: [
                // {pkId:'00', stageName: '日间提醒'},
                // {pkId:'01', stageName: '交易核对'},
                // {pkId:'02', stageName: '持仓核对'},
                // {pkId:'03', stageName: '流程管控'},
              ],
              taskInfo: {},
              bizTypeDic: this.$app.dict.getDictItems('AGNES_BIZ_CASE'),
              productStage: this.$app.dict.getDictItems('AGNES_PRODUCT_STAGE'),
              percentage: 0,
            }
        },
        async mounted() {
          const {caseId, pkId} = this.row;
          const taskDetail = await this.$api.OpCalendarApi.selectTaskDetail(caseId);
            this.taskInfo = taskDetail.data;
            if (taskDetail && taskDetail.data) {
                this.stageList = taskDetail.data.acReCaseStageVos;
                if(pkId){
                    this.curStage = this.$lodash.find(this.stageList, {pkId: pkId});
                    this.curStageId = pkId;
                }else {
                    this.curStage = this.stageList[0];
                    this.curStageId = this.stageList[0].pkId;
                }
              this.getSubTasks(this.curStage);
              //this.getSubReminds(this.curStage);
            }
        },
        computed: {
          getRatioLeft() {
            if (this.percentage < 10) {
              return `calc(${this.percentage}% - 8px)`;
            } else if (this.percentage < 100) {
              return `calc(${this.percentage}% - 10px)`;
            } else {
              return 'calc(100% - 30px)';
            }

          }
        },
        methods: {
          onCancel() {
            this.$emit("onClose");
          },

          onSave() {
            this.$emit("onClose");
          },
          getDateTime(params) {
            let startDay = "0"
            let endDay = "0";
            if (params.startDay) {
              startDay = params.startDay;
            }
            if (params.endDay) {
              endDay = params.endDay;
            }
            let startDate = (new Date(params.exeTime)).setDate((new Date(params.exeTime)).getDate() + startDay);
            let startTime = this.$dateUtils.formatDate(startDate, 'yyyy-MM-dd') + ' ' + params.startTime;
            let endDate = (new Date(params.exeTime)).setDate((new Date(params.exeTime)).getDate() + endDay);
            let endTime = this.$dateUtils.formatDate(endDate, 'yyyy-MM-dd') + ' ' + params.endTime;
            return startTime + ' 至 ' + endTime;
          },

          getBizType(dictId) {
            if (dictId) {
              return this.$lodash.find(this.bizTypeDic, {dictId});
            }
            return {};
          },
          getProductStage(dictId) {
            if (dictId) {
              return this.$lodash.find(this.productStage, {dictId}).dictName;
            }
            return '';
          },
          changeStage(stagePkId) {
                if(this.stageList && this.stageList.length>0){
                    this.curStage = this.$lodash.find(this.stageList, {pkId: stagePkId});
                    this.getSubTasks(this.curStage);
                }
            //this.getSubReminds(this.curStage)
          },

          getSubTasks(stage) {
            let rowData = [];
            this.percentage = parseInt(stage.percentage*100);
            if (stage.elecProcessStepVos && stage.elecProcessStepVos.length) {
              rowData = stage.elecProcessStepVos;
            }
            this.$refs.subTaskGrid.setRowData(rowData);
          },
          // getSubReminds(stage) {
          //     let rowDate = [];
          //     if (stage.remindMsgDetailVos && stage.remindMsgDetailVos.length) {
          //         rowDate = stage.remindMsgDetailVos;
          //     }
          //     this.$refs.subRemindGrid.setRowData(rowDate);
          // }
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
        },
    }
</script>

<style scoped>
    .workbench.detail-page {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .flex-conent {
        flex: 1;
        height: 100%;
        overflow: initial;
    }

    .flex-conent >>> .el-card__body,
    .flex-conent >>> .el-card__body .content {
        height: 100%;
    }

    .stage-list {
        display: flex;
        width: 100%;
        margin-top: -18px;
    }
    .stage-list .stage-item{
        flex: 1;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        border: 1px solid #A8AED3;
    }

    .stage-item.is-active {
        border-color: #0f5eff!important;
        background: #E6EEFF;
    }

    .stage-item >>> .el-radio-button__inner {
        width: 100%;
        color: #A8AED3;
        border: none!important;
        border-radius: 0!important;
        background: transparent!important;
        padding: 0;
        transition: none;
    }

    .stage-item >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #0F5Eff;
    }

    .stage-item:not(:last-child)::after {
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        right: -15px;
        width: 28px;
        height: 28px;
        border-top: 1px solid #A8AED3;
        border-right: 1px solid #A8AED3;
        background: #FFF;
        transform: rotate(45deg);
        z-index: 1;
    }

    .stage-item.is-active:not(:first-child)::before {
        left: -15px;
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        width: 28px;
        height: 28px;
        border-top: 1px solid #0f5eff;
        border-right: 1px solid #0f5eff;
        background: #FFF;
        transform: rotate(45deg);
        z-index: 2;
    }

    .stage-item.is-active::after {
        background: #E6EEFF;
        border-top: 1px solid #0f5eff;
        border-right: 1px solid #0f5eff;
    }

    .step-detail>span+span {
        margin-left: 40px;
    }

    .step-detail>span span {
        color: #666;
    }

    .step-detail>span label {
        color: #333;
        margin-right: 12px;
    }

    .ratio-slider {
        position: relative;
    }

    .ratio-slider >>> .el-slider__runway {
        height: 2px;
    }

    .ratio-slider >>> .el-slider__runway.disabled .el-slider__bar {
        height: 2px;
        background: #92BBF6;
    }

    .ratio-slider >>> .el-slider__button:hover,
    .ratio-slider >>> .el-slider__button-wrapper:hover {
        cursor: default!important;
    }

    .ratio-slider >>> .el-slider__button-wrapper {
        top: -17px;
    }

    .ratio-slider >>> .el-slider__button{
        position: relative;
        width: 12px;
        height: 12px;
        border-color: #4A8EF0!important;
    }

    .ratio-slider-value {
        position: absolute;
        top: -8px;
        color: #4A8EF0;
    }

</style>
