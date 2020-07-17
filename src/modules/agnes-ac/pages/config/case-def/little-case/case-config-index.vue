<template>
    <div class="little-case-page">
        <div class="option-panel" style="margin: -16px 0px 10px;border-bottom: 2px dashed #eaeaea;">
            <h5>编辑Case定义：{{this.caseDefInfo.caseDefName}}</h5>
            <div>
                <el-button type="primary" size="small" @click="cancel">取消</el-button>
                <el-button type="primary" size="small" @click="saveCase">保存</el-button>
            </div>
        </div>
        <div class="litteCase workFlowModule">
            <section class="commonTaskSection" v-if="workflowType === 'ableChoosed'">
                <span>case公共可选任务</span>
                <actionDef>
                    <template slot="steps">
                        <draggable class="stepList" :list="caseModelData.actions" :options="actionOption">
                            <stepDef v-for="(action, actionIndex) in caseModelData.actions" :key="action.stepCode"
                                     :step="{actionIndex: actionIndex,...action}" :stepIndex="actionIndex"></stepDef>
                        </draggable>
                        <div class="addTask" @click="addAction(caseModelData, 'actions')">
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
                <el-radio-group class="alterRadioBtn" v-model="workflowType" size="small">
                  <el-radio-button label="lifeRecycle">生命周期</el-radio-button>
                  <el-radio-button label="ableChoosed">可选任务</el-radio-button>
                </el-radio-group>
            </span>
                </div>
                <div class="content">
                    <template v-if="workflowType === 'lifeRecycle'">
                        <stageList class="lifeRecycle" :stageList="caseModelData.stages" stageType="stages"
                                   stepType="steps"></stageList>
                        <stageList class="ableChoosed" :stageList="caseModelData.optionalStages" stageType="optionalStages"
                                   stepType="steps"></stageList>
                    </template>
                    <template v-if="workflowType === 'ableChoosed'">
                        <stageList class="lifeRecycle" :stageList="caseModelData.stages" stageType="stages"
                                   stepType="optionalSteps"></stageList>
                        <stageList class="ableChoosed" :stageList="caseModelData.optionalStages" stageType="optionalStages"
                                   stepType="optionalSteps"></stageList>
                    </template>
                </div>
            </section>
            <el-drawer class="stepDetailDrawer"
                       ref="stepDetailDrawer"
                       :withHeader="false"
                       :show-close="false"
                       :visible.sync="drawerVisible"
                       :destroy-on-close="true"
                       direction="rtl"
                       size="850px">
                <stepDetail class="stepDetail" v-bind="stepDetailProps" @saveStepInfo="saveStepInfo"></stepDetail>
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
            caseDefInfo: {type:Object, required:false},
        },
        data() {
            return {
                workflowType: 'lifeRecycle',
                actionOption: {group: {name: 'actionStep'}, put: false, ghostClass: 'stepGhost'},
                caseModelData: this.caseDefInfo.caseDefBody?JSON.parse(this.caseDefInfo.caseDefBody):mockData,
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
            this.$app.registerCmd("openDialog", this.onShowDialog);
        },
        methods: {
            cancel(){
                this.$nav.closeCurrentTab(this);
            },
            async saveCase(){
                this.caseDefInfo.caseDefBody = JSON.stringify(this.caseModelData);
                this.caseDefInfo.caseStatus = 0;
                try {
                    const p = this.$api.caseConfigApi.saveCaseDef(this.caseDefInfo);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    this.$nav.closeCurrentTab(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            // 新增action
            addAction(stage, stepType) {
                this.$app.runCmd('openDialog', 'add', {}, {curStage: stage, stepType: stepType});
            },

            // 打开step详情配置页
            onShowDialog(optionType, dialogForm, args) {
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
        },
    }
</script>
<style>

</style>
