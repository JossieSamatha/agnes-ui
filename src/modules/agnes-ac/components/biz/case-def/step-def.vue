<template>
    <div class="step-comp" @dblclick="editTaskInfo" :style="{border:  isLastestVersion? '':'1px solid red'}">
        <em class="step-icon" :class="iconTypeObj" v-html="lcImg[iconTypeObj]"></em>
        <span class="name" :title="step.stepName">{{step.stepName}}</span>
        <span class="edit" v-if="!preview">
            <em class="fa fa-copy" @click="copyTask" v-show="mode!='view'"></em>
            <em class="fa fa-trash-o" @click="deleteTask" v-show="mode!='view'"></em>
        </span>
        <span class="status" v-else-if="stepStatus"><em v-html="getStatusIcon(stepStatus).icon"></em></span>
    </div>
</template>

<script>
    export default {
        props: {
            step: {
                type: Object,
                require: true
            },
            mode: {
                type: String,
                default: 'add'
            },
            stepList: {
                type: Array,
                require: true
            },
            updatedStepList: {
                type: Array
            },
            stepIndex: {
                type: Number,
                require: true
            },
            stepType: {
                type: String,
                require: true
            },
            preview: {
                type: Boolean,
                default: false
            },
            getStatusIcon: Function,
            ruCaseStepList: Object
        },
        data(){
            return {
                isLastestVersion:true,
                lcImg: this.$lcImg
            }
        },
        watch:{
            'updatedStepList':"isLastestVersionCheck"
        },
        computed: {
            iconTypeObj() {
                const iconIndex = parseInt(this.step.stepActType) - 1;
                const iconTypeArr = ['indicator', 'process', 'process','robot','ocr','person', 'auto','icrApprove'];
                return iconTypeArr[iconIndex] || 'person';
            },
            stepStatus(){
                const stepCode = this.step.stepFormInfo.caseStepDef.stepCode;
                return this.ruCaseStepList[stepCode].stepStatus;
            }
        },
        mounted() {
            this.isLastestVersionCheck();
        },
        methods: {
            isLastestVersionCheck(){
                if(this.updatedStepList){
                    this.isLastestVersion = true;
                    this.updatedStepList.forEach((item=>{
                        if(item.stepCode == this.step.stepFormInfo.caseStepDef.stepCode){
                            this.isLastestVersion = false;
                            this.step.stepFormInfo.caseStepDef.stepId = item.stepId;
                            this.step.stepFormInfo.caseStepDef.isLastestVersion = false;
                        }
                    }));
                }
            },
            // 修改task信息
            editTaskInfo() {
                if(this.preview){
                    return;
                }
                this.$app.runCmd('openStepDialog', 'edit', this.step, {stepIndex: this.stepIndex, stepList: this.stepList});
            },

            // 复制task信息
            copyTask(){
                let copyObj = this.$utils.deepClone(this.step);
                copyObj.stepFormInfo.caseStepDef.stepCode = '';
                copyObj.stepName += '（新）';
                this.$app.runCmd('openStepDialog', 'copy', copyObj, {stepIndex: this.stepIndex, stepList: this.stepList});
            },

            // 删除task
            async deleteTask() {
                const ok = await this.$msg.ask(`确认删除吗, 是否继续?`);
                if (ok) {
                    this.$app.runCmd('openStepDialog', 'deleteStep', this.step.stepFormInfo.caseStepDef.stepCode);
                    this.stepList.splice(this.stepIndex, 1);
                }
            }
        }
    }
</script>
