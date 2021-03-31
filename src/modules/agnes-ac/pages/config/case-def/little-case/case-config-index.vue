<template>
  <div class="little-case-page">
    <div class="little-case work-flow-module">
      <section class="common-task-section" v-if="workflowType === 'ableChoosed'">
        <span>case公共可选任务</span>
        <actionDef>
          <template slot="steps">
            <draggable class="step-list" :list="caseModelData.actions" :options="actionOption">
              <stepDef v-for="(action, actionIndex) in caseModelData.actions" :key="action.stepCode"
                       :step="{actionIndex: actionIndex,...action}" :stepIndex="actionIndex"></stepDef>
            </draggable>
            <div class="add-task" @click="addAction(caseModelData, 'actions')">
              <em class="el-icon-plus"></em>
              <span>添加任务</span>
            </div>
          </template>
        </actionDef>
      </section>
      <section class="taskSection">
        <div class="option-panel">
                    <span>阶段层级任务
                        <el-button type="text" @click="getStepCodeArr">stepCode数组重新获取</el-button>
                    </span>
          <span>
                        <el-radio-group class="alter-radio-btn" v-model="workflowType" size="small">
                          <el-radio-button label="lifeRecycle">生命周期</el-radio-button>
                          <el-radio-button label="ableChoosed">可选任务</el-radio-button>
                        </el-radio-group>
                    </span>
        </div>
        <div class="content">
          <template v-if="workflowType === 'lifeRecycle'">
            <stageList class="lifeRecycle" :stageList="caseModelData.stages" stageType="stages"
                       stepType="steps"></stageList>
            <stageList class="able-choosed" :stageList="caseModelData.optionalStages" stageType="optionalStages"
                       stepType="steps"></stageList>
          </template>
          <template v-if="workflowType === 'ableChoosed'">
            <stageList class="lifeRecyclstagee" :stageList="caseModelData.stages" stageType="stages"
                       stepType="optionalSteps"></stageList>
            <stageList class="able-choosed" :stageList="caseModelData.optionalStages" stageType="optionalStages"
                       stepType="optionalSteps"></stageList>
          </template>
        </div>
      </section>
      <el-drawer class="step-detail-drawer"
                 ref="stepDetailDrawer"
                 :withHeader="false"
                 :show-close="false"
                 :visible.sync="drawerVisible"
                 :destroy-on-close="true"
                 :append-to-body="false"
                 :modal="false"
                 direction="rtl"
                 size="890px">
        <stepDetail class="step-detail" v-bind="stepDetailProps" @saveStepInfo="saveStepInfo" @cancelAction="cancelAction"></stepDetail>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import stepDetail from './step-detail';
import stageList from './stage-list';
import mockData from './mockData'

export default {
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    row: Object,
    actionOk: Function
  },
  data() {
    return {
      workflowType: 'lifeRecycle',
      actionOption: {group: {name: 'actionStep'}, put: false, ghostClass: 'stepGhost'},
      caseModelData: {},
      drawerVisible: false,
      stepDetailProps: {},
      stepList:[],
      stepCodeArr: {}, // 记录当前所有stepCode
    }
  },
  components: {
    stageList,
    stepDetail
  },
  mounted() {
    this.caseModelData = this.row.caseDefInfo.caseDefBody?JSON.parse(this.row.caseDefInfo.caseDefBody) : this.$utils.deepClone(mockData);
    this.stepCodeArr = this.caseModelData.stepCodeArr || {};
    this.$app.registerCmd("openStepDialog", this.onShowDialog);
  },
  methods: {
    getStepCodeArr(){
      const modelData = this.$lodash.cloneDeep(this.caseModelData.stages);
      const stepCodeObj = {};
      for(let i=0; i<modelData.length; i++ ){
        modelData[i].children.forEach((stages)=>{
          if(stages.defType === "step"){
            stepCodeObj[stages.stepFormInfo.caseStepDef.stepCode] = stages.stepName
          }else{
            this.traverseData(stages.steps, stepCodeObj);
          }
        })
      }
      this.stepCodeArr = stepCodeObj;
    },

    traverseData(arr, stepCodeObj){
      arr.forEach((groupItem)=>{
        if(groupItem.defType === 'group'){
          this.traverseData(groupItem.steps, stepCodeObj);
        }else{
          stepCodeObj[groupItem.stepFormInfo.caseStepDef.stepCode] = groupItem.stepName
        }
      });
    },

    // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
    onCancel(){
      this.$emit("onClose");
    },

    // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
    async onSave(){
      this.caseModelData.stepCodeArr = this.stepCodeArr;
      this.row.caseDefInfo.caseDefBody = JSON.stringify(this.caseModelData)
      if(this.mode==='addMult'){
        if (this.actionOk) {
          await this.actionOk(this.row.caseDefInfo.caseDefBody);
        }
        this.$emit("onClose");
      }else {
        try {
          this.row.caseDefInfo.isCheckCode = false;
          const p = this.$api.flowTaskApi.saveFlowTask(this.row.caseDefInfo);
          await this.$app.blockingApp(p);
          this.$msg.success('保存成功');
          if (this.actionOk) {
            await this.actionOk();
          }
          this.$emit("onClose");
        } catch (e) {
          this.$msg.error(e);
        }
      }
    },
    // 新增action
    addAction(stage, stepType) {
      this.$app.runCmd('openStepDialog', 'add', {}, {curStage: stage, stepType: stepType});
    },

    // 打开step详情配置页
    onShowDialog(optionType, dialogForm, args) {
      if(optionType === 'deleteStep'){
        this.$delete(this.stepCodeArr, dialogForm);
        return false;
      }else if(optionType === 'deleteStage'){
        const deleteObj = {};
        this.traverseData(dialogForm, deleteObj);
        this.stepCodeArr = this.$lodash.omit(this.stepCodeArr, Object.keys(deleteObj));
        return false;
      }
      if(!this.row.caseDefInfo.reTaskDef.bizType){
        this.row.caseDefInfo.reTaskDef.bizType='';
      }
      args.bizType = this.row.caseDefInfo.reTaskDef.bizType;
      args.caseKey = this.row.caseDefInfo.reTaskDef.caseKey;
      this.drawerVisible = true;
      this.stepDetailProps = {
        optionType: optionType,
        formObj: dialogForm,
        stepCodeArr: this.stepCodeArr,
        args: args
      }
    },

    // 保存step详情配置页数据
    saveStepInfo(stepObj){
      // 获得表单数据
      let stepInfoCopy = this.$utils.deepClone(stepObj.stepInfo);
      // 获得step操作list数据
      let taskArgs = stepObj.taskArgs;
      const stepCode = stepInfoCopy.stepFormInfo.caseStepDef.stepCode;
      const stepName = stepInfoCopy.stepName;

      // 如果是新增step任务
      if (stepObj.optionType === 'add') {
        let addType = taskArgs.addType;
        let curStage = taskArgs.curStage;
        let stepType = taskArgs.stepType;
        stepInfoCopy.optional = !(stepType === 'stages' || stepType === 'steps');

        if(addType === 'stage'){
          curStage.children.push(stepInfoCopy);
        }else{
          if (!curStage[stepType]) {
            this.$set(curStage, stepType, []);
          }
          curStage[stepType].push(stepInfoCopy);
        }
      }

      // 如果是修改step任务
      if (stepObj.optionType === 'edit') {
        let taskIndex = taskArgs.stepIndex;
        let stepList = taskArgs.stepList;
        stepList.splice(taskIndex, 1, stepInfoCopy);
        this.$delete(this.stepCodeArr, stepInfoCopy.initialStepCode);
      }
      if (stepObj.optionType === 'copy') {
        let taskIndex = taskArgs.stepIndex + 1;
        let stepList = taskArgs.stepList;
        stepList.splice(taskIndex, 0, stepInfoCopy);
      }
      this.stepCodeArr[stepCode] = stepName;
      // this.stepCodeArr.push(stepCode);
      this.$refs.stepDetailDrawer.closeDrawer();
    },

    cancelAction(){
      this.$refs.stepDetailDrawer.closeDrawer();
    }
  },
}
</script>
