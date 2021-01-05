<template>
    <div>
        <p class="pro-title">操作流程</p>
        <el-steps class="step-vertical" direction="vertical" :active="activeStep" :space="50">
            <template v-for="(step, stepIndex) in stepArr">
                <el-step :key="stepIndex"
                         @click.native="activeStep===stepIndex ? stepClick(step) : false"
                        v-if="step.stepId !== '09'"
                >
                    <template slot="icon">
                        <span v-html="lcImg[step.stepIcon]"></span>
                    </template>
                    <template slot="title">
                        <span>{{step.stepTitle}}</span>
                        <span v-show="activeStep===stepIndex && canObsolete"
                              class="obsolete-step"
                              @click.prevent.stop="stepDelete"
                        ><span v-html="lcImg.obsolete"></span>作废</span>
                    </template>
                </el-step>
            </template>
        </el-steps>
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
                    '07': 'proCheck', // 账户信息复核（审核）
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
                        this.stepData.processStatus === '03' ||
                        ((this.stepData.bizType === '04' || this.stepData.bizType === '05') && (this.stepData.processStatus === '06'|| this.stepData.processStatus === '07')))
            },
            stepArr(){
                const stepData = this.stepData;
                const validateArr = [
                    stepData.bizType !== '04' && stepData.bizType !== '05',
                    stepData.bizType !== '04' && stepData.bizType !== '05',
                    stepData.isSendOa==1 && stepData.bizType !== '04' && stepData.bizType !== '05',
                    stepData.bizType !== '04' && stepData.bizType !== '05' && !stepData.applySubId,
                    stepData.isSendFinance==1 && stepData.bizType !== '04' && stepData.bizType !== '05' && !stepData.applySubId,
                    !stepData.applySubId && stepData.bizType !== '03',
                    !stepData.applySubId && stepData.bizType !== '03',
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
                }else if(status === '03'){
                    this.$emit('submitOA');
                }
            },

            stepDelete(){
                this.$emit('stepDelete', {data: this.stepData});
            }
        }
    }
</script>

<style>
    .pro-title {
        line-height: 35px;
        background: #eaedf1;
        margin: 0 -20px 10px;
        padding-left: 25px;
    }

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

    .step-vertical .el-step__head.is-process .el-step__icon>span>svg {
        fill: #0F5EFF;
    }

    .step-vertical .el-step__head.is-finish .el-step__icon>span>svg {
        fill: #1CAD26;
    }

    .step-vertical .el-step__head.is-wait .el-step__icon>span>svg {
        fill: #ccc;
    }

    .step-vertical .el-step__head.is-wait .el-step__icon {
        color: #999;
    }

    .step-vertical .el-step.is-vertical .el-step__line {
        width: 0;
        border: 1px dashed #999;
        background: transparent;
    }

    .step-vertical .el-step.is-vertical .el-step__line .el-step__line-inner {
        border-width: 0!important;
    }

    .step-vertical .el-step__head.is-finish .el-step__line {
        border-color: #1CAD26;
        border-style: solid;
    }

    .step-vertical .el-step__head.is-process .el-step__line {
        border-color: #0F5EFF;
    }

    .step-vertical .el-step__head.is-wait .el-step__line {
        border-color: #999;
    }

    .el-step.is-vertical .el-step__main .el-step__title {
        font-size: 14px;
        font-weight: normal;
        display: inline-block;
        padding: 0 8px;
        border-radius: 5px;
    }

    .step-vertical .el-step__main .el-step__title.is-process {
        position: relative;
        color: #0F5EFF;
        border: 1px solid #0f5eff;
        cursor: pointer;
    }

    .step-vertical .el-step__main .el-step__title.is-finish {
        color: #1CAD26;
    }

    .step-vertical .el-step__main .el-step__title.is-wait {
        color: #999;
    }

    .obsolete-step {
        position: absolute;
        color: #f5222e;
        top: -1px;
        right: -48px;
    }

    .obsolete-step>span {
        width: 16px;
        display: inline-block;
        vertical-align: text-bottom;
        height: 16px;
        margin-right: 1px;
    }

    .obsolete-step.disabled {
        color: #999;
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
        fill: #999;
    }

    .obsolete-step .title {
        line-height: 21px;
        cursor: pointer;
    }

    .obsolete-step.disabled .title {
        cursor: default;
    }

</style>
