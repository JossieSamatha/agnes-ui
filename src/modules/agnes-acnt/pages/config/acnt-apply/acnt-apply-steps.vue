<template>
    <div style="height: 100%">
        <el-steps class="step-vertical" direction="vertical" :active="activeStep" :space="50">
            <template v-for="(step, stepIndex) in stepArr">
                <el-step :key="stepIndex"
                        :title="step.stepTitle"
                         @click.native="activeStep===stepIndex ? stepClick(step) : false"
                        v-if="step.stepId !== '09'"
                >
                    <template slot="icon">
                        <span v-html="lcImg[step.stepIcon]"></span>
                    </template>
                </el-step>
            </template>
        </el-steps>
        <div class="obsolete-step"
             :class="canObsolete?'':'disabled'"
        >
            <span class="icon" v-html="lcImg.proObsolete"></span>
            <span class="title" @click="canObsolete ? stepDelete() : false">作废</span>
        </div>
    </div>

</template>

<script>

    export default {
        name: "apply-define",
        props: {
            stepData: Object
        },
        data() {
            return {
                lcImg: this.$lcImg,
                stepStatusArr: this.$app.dict.getDictItems('AGNES_ACNT_APPLY_STATUS'),
                iconMap: {
                    '01': 'proStart', // 发起申请（编辑）
                    '02': 'proCheck', // 复核（审核）
                    '03': 'proSubmit', // 提交OA（/）
                    '04': 'proPrepare', // 资料准备（审核）
                    '05': 'proFinancial', // 财务流程（审核）
                    '06': 'proAccount', // 账户信息录入（编辑）
                    '07': 'proAccountCheck', // 账户信息复核（审核）
                    '08': 'proArchive', // 归档()
                    '09': 'proObsolete', // 作废
                },
                editPermission:  this.$hasPermission('agnes.acnt.apply.edit'),
                checkPermission:  this.$hasPermission('agnes.acnt.apply.check'),
                deletePermission:  this.$hasPermission('agnes.acnt.apply.delete')
            }
        },
        computed: {
            canObsolete(){
                return (this.stepData.processStatus === '01' ||
                        this.stepData.processStatus === '02' ||
                        this.stepData.processStatus === '03')
            },
            stepArr(){
                const stepData = this.stepData;
                const validateArr = [
                    stepData.bizType !== '04',
                    stepData.bizType !== '04',
                    stepData.isSendOa==1 && stepData.bizType !== '04',
                    stepData.bizType !== '04' && !stepData.applySubId,
                    stepData.isSendFinance==1 && stepData.bizType !== '04' && !stepData.applySubId,
                    stepData.bizType !== '04' && !stepData.applySubId,
                    !stepData.applySubId,
                    true,
                    true
                ];
                // 获取流程节点
                const processStep = this.$lodash.cloneDeep(this.stepStatusArr);
                if(processStep && processStep.length>0){
                    return processStep.filter(
                        (x, index) =>  {
                            return validateArr[index];
                        }
                    ).map((step)=>{
                        return {
                            stepId: step.dictId,
                            stepTitle: step.dictName,
                            stepIcon: this.iconMap[step.dictId] || this.lcImg.indicator
                        }
                    });
                }else{
                    return [];
                }
            },

            activeStep(){
                const activeIndex = this.$lodash.findIndex(this.stepArr, {stepId: this.stepData.processStatus});
                if(activeIndex){
                    return activeIndex;
                }else{
                    return 0;
                }
            }
        },
        methods: {
            stepClick(step){
                const status = step.stepId;
                if(status === '01' || status === '06'){
                    this.$emit('stepEdit', {data: this.stepData});
                }else if(status === '02' || status === '04'|| status === '05'|| status === '07'){
                    this.$emit('stepCheck', {data: this.stepData});
                }
            },

            stepDelete(){
                this.$emit('stepDelete', {data: this.stepData});
            }
        }
    }
</script>

<style>
    .step-vertical.el-steps.el-steps--vertical {
        height: auto;
    }

    .step-vertical .el-step__head .el-step__icon {
        border: none;
    }

    .step-vertical .el-step__head .el-step__icon>span {
        display: block;
        width: 21px;
        height: 21px;
        text-align: center;
    }

    .step-vertical .el-step__head .el-step__icon>span>svg {
        color: #666;
    }

    .step-vertical .el-step__head.is-finish .el-step__icon>span>svg {
        fill: #476DBE;
    }

    .step-vertical .el-step__head.is-wait .el-step__icon>span>svg {
        fill: #ccc;
    }

    .step-vertical .el-step__head.is-wait .el-step__icon {
        color: #ccc;
    }

    .step-vertical .el-step__head.is-finish .el-step__line,
    .step-vertical .el-step__head.is-process .el-step__line {
        border-color: #476DBE;
        background: #476DBE;
    }

    .step-vertical .el-step__main .el-step__title {
        color: #666;
        font-size: 14px;
        font-weight: normal;
    }

    .step-vertical .el-step__main .el-step__title.is-process {
        cursor: pointer;
    }

    .step-vertical .el-step__main .el-step__title.is-finish {
        color: #476Dbe;
    }

    .step-vertical .el-step__main .el-step__title.is-wait {
        color: #ccc;
    }

    .obsolete-step {
        display: flex;
        width: 100%;
        height: 50px;
        color: #f5222e;
    }

    .obsolete-step.disabled {
        color: #ccc;
    }

    .obsolete-step .icon {
        display: block;
        width: 24px;
        margin-right: 10px;
        line-height: 21px;
        cursor: default;
    }

    .obsolete-step .icon>svg {
        fill: #f5222e;
    }

    .obsolete-step.disabled .icon>svg {
        fill: #ccc;
    }

    .obsolete-step .title {
        line-height: 21px;
        cursor: pointer;
    }

    .obsolete-step.disabled .title {
        cursor: default;
    }

</style>
