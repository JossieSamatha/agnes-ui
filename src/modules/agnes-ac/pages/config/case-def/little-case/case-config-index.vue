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
                            <i class="el-icon-plus"></i>
                            <span>添加任务</span>
                        </div>
                    </template>
                </actionDef>
            </section>
            <section class="taskSection">
                <div class="option-panel">
                    <span>阶段层级任务</span>
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
                       :append-to-body="true"
                       :modal="false"
                       direction="rtl"
                       size="850px">
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
                stepList:[]
            }
        },
        components: {
            stageList,
            stepDetail
        },
        mounted() {
            this.caseModelData = this.row.caseDefInfo.caseDefBody?JSON.parse(this.row.caseDefInfo.caseDefBody) : this.$utils.deepClone(mockData) ;
            this.$app.registerCmd("openStepDialog", this.onShowDialog);
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            onCancel(){
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave(){
                this.row.caseDefInfo.caseDefBody = JSON.stringify(this.caseModelData)
                try {
                    const p = this.$api.flowTaskApi.saveFlowTask(this.row.caseDefInfo);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    this.$emit("onClose");
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            // 新增action
            addAction(stage, stepType) {
                this.$app.runCmd('openStepDialog', 'add', {}, {curStage: stage, stepType: stepType});
            },

            // 打开step详情配置页
            onShowDialog(optionType, dialogForm, args) {

                args.bizType = this.row.caseDefInfo.reTaskDef.bizType
                this.drawerVisible = true;
                this.stepDetailProps = {
                    optionType: optionType,
                    formObj: dialogForm,
                    args: args
                }
            },

            // 保存step详情配置页数据
            saveStepInfo(stepObj){
                // 获得表单数据
                let stepInfoCopy = JSON.parse(JSON.stringify(stepObj.stepInfo));
                // 获得step操作list数据
                let taskArgs = stepObj.taskArgs;

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
                }
                this.$refs.stepDetailDrawer.closeDrawer();
            },

            cancelAction(){
                this.$refs.stepDetailDrawer.closeDrawer();
            }
        },
    }
</script>
<style>

</style>
