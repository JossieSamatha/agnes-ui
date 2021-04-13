<template>
  <div class="elec-process board-detail">
    <div class="full-screen-btn">
      <em v-show="!ifFullScreen" v-html="lcImg.fullScreen" @click="expandFullScreen(true)"></em>
      <em v-show="ifFullScreen" v-html="lcImg.exitFullScreen" @click="expandFullScreen(false)"></em>
    </div>
    <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <em class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></em>
            </span>
      <div class="bottom left">
        <div class="section-title">
          <span>流程图</span>
          <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                        <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                            <em class="fa fa-circle"
                                :style="{color: statusColor}"
                            ></em>{{ status }}
                        </span>
          </div>
        </div>
        <div class="flow-container" style="height: 100%">
          <stageList class="lifeRecycle" :stageList="taskStage" :preview="true"
                     @showTableDetail="showTableDetail"></stageList>
        </div>
        <div v-show="ifGridExpand" class="drag-column" id="taskContainerLeft">
          <div class="close-container" @click="closeTableDetail"></div>
          <div class="drag-container" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn">
            <gf-grid ref="monitorLeader"
                     height="100%"
                     grid-no="agnes-monitor-leader-field">
              <template slot="left">
                <el-button type="text" icon="fa fa-reply" style="color: #0f5eff;" @click="closeTableDetail"> 返回
                </el-button>
              </template>
              <template slot="right-before">
                                <span class="full-screen-btn">
                                     <em v-show="!ifDetailFullScreen" v-html="lcImg.fullScreen"
                                         @click="expandDetailFullScreen(true)"></em>
                                    <em v-show="ifDetailFullScreen" v-html="lcImg.exitFullScreen"
                                        @click="expandDetailFullScreen(false)"></em>
                                </span>
              </template>
            </gf-grid>
          </div>
        </div>
      </div>
      <div class="bottom right" v-show="ifRightExpand">
        <div class="chart-container">
          <p class="section-title">任务进度</p>
          <pie-chart ref="pieChart" :chart-data="executePieData" :title="pieTitle"
                     :color-set="['#0f5eff','#E0E0E0']"></pie-chart>
        </div>
        <div class="exec-container">
          <p class="section-title">
            <span>执行情况</span>
            <el-checkbox-group class="exec-type" v-model="execTypeChecked" size="small" @change="execTypeChange">
              <el-checkbox v-for="exeType in execTypeOp" :key="exeType.id" :label="exeType.id" border>
                <em v-html="lcImg[exeType.icon]"></em><span>{{ exeType.label }}</span>
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
              <span>{{ execItem.content }}</span>
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
      pieTitle: '',
      taskStage: [],
      execLog: [],
      ifRightExpand: false,
      ifGridExpand: false,
      stageStatus: {
        '#DFE1E5': '未开始',
        '#4A8EF0': '执行中',
        '#F5222E': '已异常/已超时',
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
      taskIdList: [],
      ifDetailFullScreen: false
    }
  },
  components: {
    stageList
  },
  created() {
    this.getFLowDetail(this.task.taskId, this.task.caseId, this.bizDate, this.task.finishedRate);
  },
  beforeDestroy() {
    clearInterval(this.freshInterval);
  },
  methods: {
    // 全屏展开操作
    expandFullScreen(status) {
      this.ifFullScreen = status;
      this.$emit('fullScreenOption', this.ifFullScreen);
    },

    // 返回关闭抽屉;
    onCancel() {
      this.$emit("onClose");
    },

    // 刷新页面数据
    onSave() {
      this.getFLowDetail(this.task.taskId, this.task.caseId, this.bizDate, this.task.finishedRate);
    },

    // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
    async getFLowDetail(taskId, caseId, bizDate, finishedRate) {
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
          {name: '未完成', value: (targetNum - completeNum)}
        ];
        this.executePieData = executePieData;
        this.pieTitle = parseInt(finishedRate * 100) + '%'
        // 获取执行情况
        this.taskIdList = flowDetailParse.taskIdList;
        this.getExecuteData(flowDetailParse.taskIdList, this.execTypeChecked);
      } else {
        this.taskStage = [];
        this.executePieData = [];
        this.taskIdList = [];
      }
    },

    showTableDetail(gridData) {
      this.ifGridExpand = true;
      this.setGridData(gridData);
    },

    closeTableDetail() {
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
  }
}
</script>
