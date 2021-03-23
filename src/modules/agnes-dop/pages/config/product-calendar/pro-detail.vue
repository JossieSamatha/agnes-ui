<template>
  <div class="datavPage pro-detail">
    <el-radio-group class="stage-list" v-model="curStageId" @change="changeStage">
      <el-radio-button class="stage-list-item" v-for="(stageItem,index) in stageList" :key="index"
                       :label="stageItem.pkId">
        {{ stageItem.stageName }}
      </el-radio-button>
    </el-radio-group>
    <module-card title="任务信息">
      <template slot="content">
        <el-form label-width="50%" class="infoForm" size="mini">
          <div class="line">
            <el-form-item label="业务场景" prop="bizType">
              <span>{{ getBizType(taskInfo.bizType).dictName }}</span>
            </el-form-item>
            <el-form-item label="当前节点" prop="msgName">
              <span>{{ curStage.stageName }}</span>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="任务触发事件" prop="eventName">
              <span>{{ taskInfo.eventName }}</span>
            </el-form-item>
            <el-form-item label="执行方式" prop="custodianBank">
              <span>{{ taskInfo.custodianBank }}</span>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="任务开始时间" prop="execStartTime">
              <span>{{ taskInfo.execStartTime }}</span>
            </el-form-item>
            <el-form-item label="任务提醒时间" prop="remindTime">
              <span>{{ taskInfo.remindTime }}</span>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="开始人" label-width="25%" prop="crtName">
              <span>{{ taskInfo.crtName }}</span>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </module-card>
    <module-card title="子任务">
      <template slot="content">
        <div class="line" style="display: flex;position: relative">
          <el-progress class="subtask-progress"
                       style="height: 180px;margin: auto 50px auto auto;"
                       type="circle"
                       :percentage="70"
                       color="#4C6CFF"
                       :width="180"
                       :stroke-width="22"
          ></el-progress>
          <div class="subtask-legend">
            <span><em class="fa fa-circle" style="color: #4C6CFF"></em>已完成</span>
            <span><em class="fa fa-circle" style="color: #D7DBE4"></em>未完成</span>
          </div>
          <gf-grid ref="subTaskGrid" grid-no="monitor-sub-pro-task"
                   style="height: 210px;margin: -40px auto auto"></gf-grid>
        </div>
      </template>
    </module-card>
    <module-card title="处理日志">
      <template slot="content">
        <gf-grid grid-no="monitor-deal-log" style="height: 210px;margin: -40px auto auto"></gf-grid>
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
      curStageId: '',
      stageList: [],
      taskInfo: {},
      bizTypeDic: this.$app.dict.getDictItems('AGNES_BIZ_CASE'),
    }
  },
  async mounted() {
    const {caseId, pkId} = this.row;
    const taskDetail = await this.$api.productCalendarApi.selectTaskDetail(caseId);
    this.taskInfo = taskDetail.data;
    if (taskDetail && taskDetail.data) {
      this.stageList = taskDetail.data.acReCaseStageVos;
      this.curStage = this.$lodash.find(this.stageList, {pkId: pkId});
      this.curStageId = pkId;
      this.getSubTasks(this.curStage);
    }
  },
  methods: {
    onCancel() {
      this.$emit("onClose");
    },

    onSave() {
      this.$emit("onClose");
    },

    getBizType(dictId) {
      if (dictId) {
        return this.$lodash.find(this.bizTypeDic, {dictId});
      }
      return {};
    },

    changeStage(stagePkId) {
      this.curStage = this.$lodash.find(this.stageList, {pkId: stagePkId});
      this.getSubTasks(this.curStage);
      this.getSubReminds(this.curStage)
    },

    getSubTasks(stage) {
      if (stage.ruCaseStepVos && stage.ruCaseStepVos.length) {
        this.$refs.subTaskGrid.setRowData(stage.ruCaseStepVos);
      }
    },
    getSubReminds(stage) {
      if (stage.remindMsgDetailVos && stage.remindMsgDetailVos.length) {
        this.$refs.subRemindGrid.setRowData(stage.remindMsgDetailVos);
      }

    }

  },
}
</script>

<style scoped>
.subtask-progress >>> .el-progress-circle > svg > path:first-child {
  stroke: #D7DBE4;
}

.subtask-progress >>> .el-progress-circle .el-progress__text {
  stroke: #4c6cff;
}

.stage-list {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}

.stage-list-item {
  position: relative;
  flex: 1;
  max-width: 190px;
  border: 1px solid transparent;
}

.stage-list-item.is-active {
  border-color: #0f5eff;
}

.stage-list-item + .stage-list-item {
  margin-left: 37px;
}

.stage-list-item >>> .el-radio-button__inner {
  width: 100%;
  color: #333;
  background: #F2F6FF;
  border: none !important;
  border-radius: 0 !important;
  padding: 11px 20px;
  transition: none;
}

.stage-list-item >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #D6E1FC;
  color: #0F5Eff;
}

.stage-list-item::before,
.stage-list-item::after {
  content: '';
  display: block;
  position: absolute;
  top: 5px;
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
  transform: rotate(45deg);
  z-index: 1;
}

.stage-list-item:not(:first-child)::before {
  left: -13px;
  border-top: inherit;
  border-right: inherit;
  background: #FFF;
}

.stage-list-item::after {
  right: -14px;
  border-top: inherit;
  border-right: inherit;
  background: #F2F6FF;
  transform: rotate(45deg);
}

.stage-list-item.is-active::after {
  background: #D6E1FC;
}

.subtask-legend {
  position: absolute;
  bottom: 20px;
  left: 23px;
}

.subtask-legend > span + span {
  margin-left: 18px;
}

.subtask-legend > span > em {
  margin-right: 4px;
}
</style>
