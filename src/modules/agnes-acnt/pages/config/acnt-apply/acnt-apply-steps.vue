<template>
   <div style="height: 100%">
        <el-steps class="step-vertical" direction="vertical" :active="activeStep" :space="50">
            <el-step v-for="(step, stepIndex) in stepArr"
                     :key="step.stepId"
                     :title="step.stepTitle"
            >{{stepIndex}}</el-step>
        </el-steps>
    </div>
</template>

<script>
    export default {
        name: "apply-define",
        props: {
            mode: {
                type: String,
                default: 'view'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                stepArr: this.$app.dict.getDictItems('AGNES_ACNT_APPLY_STATUS'),
                activeStep: 0,
                nowStep:3
            }
        },
        beforeMount() {
            // 流程过滤条件
            const validateArr = [
                this.row.bizType !== '04',
                this.row.bizType !== '04',
                this.row.isSendOa==1 && this.row.bizType !== '04',
                this.row.bizType !== '04' && !this.row.applySubId,
                this.row.isSendFinance==1 && this.row.bizType !== '04' && !this.row.applySubId,
                this.row.bizType !== '04' && !this.row.applySubId,
                !this.row.applySubId,
                true,
                true
            ];
            // 获取流程节点
            const processStep = this.$app.dict.getDictItems('AGNES_ACNT_APPLY_STATUS');
            if(processStep && processStep.length>0){
                this.stepArr = processStep.filter(
                    (x, index) =>  {
                        return validateArr[index];
                    }
                ).map((step)=>{
                    return {
                        stepId: step.dictId,
                        stepTitle: step.dictName
                    }
                });
            }

            const activeIndex = this.$lodash.findIndex(this.stepArr, {stepId: this.row.processStatus});
            if(activeIndex){
                this.activeStep = activeIndex;
            }else{
                this.activeStep = 0;
            }
        },
        methods: {
           
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },

        
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                this.$emit("onClose");
           
            },
        },
    }
</script>

<style>
    .step-vertical .el-step__head .el-step__icon.is-text
    .el-step__icon-inner{
        font-weight: normal;
    }

    .step-vertical .el-step__head.is-finish .el-step__icon.is-text
    .el-step__icon-inner{
        display: none;
    }

    .step-vertical .el-step__head.is-finish .el-step__icon,
    .step-vertical .el-step__head.is-process .el-step__icon {
        color: #fff;
        font-weight: bold;
        background: #476DBE;
        border-color: #476DBE;
    }

    .step-vertical .el-step__head.is-wait .el-step__icon {
        color: #ccc;
        border-color: #ccc;
    }

    .step-vertical .el-step__head.is-finish .el-step__icon.is-text::before{
        content: "\e6da";
        font-size: 16px;
        font-family: "element-icons";
    }

    .step-vertical .el-step__head.is-finish .el-step__line,
    .step-vertical .el-step__head.is-process .el-step__line {
        border-color: #476DBE;
    }

    .step-vertical .el-step__main .el-step__title {
        color: #666;
        font-size: 14px;
    }

    .step-vertical .el-step__main .el-step__title.is-finish {
        color: #476Dbe;
    }

    .step-vertical .el-step__main .el-step__title.is-wait {
        color: #ccc;
    }
</style>
