<template>
    <ul class="step-type">
        <li v-for="stepType in stepTypeOption"
            :key="stepType.id"
            :class="stepType.type"
            :title="stepType.label"
            v-html="lcImg[stepType.icon]"
            @click="addStep(stepType.id)">
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                lcImg: this.$lcImg,
                stepTypeOption: [
                    {
                        id: '1',
                        type: 'indicator',
                        label: '监控指标任务',
                        icon: 'indicator'
                    },
                    {
                        id: '6',
                        type: 'person',
                        label: '人工MOT任务',
                        icon: 'person'
                    },
                    {
                        id: '7',
                        type: 'auto',
                        label: '自动处理任务',
                        icon: 'auto'
                    },
                    {
                        id: '3',
                        type: 'process',
                        label: '审批流程任务',
                        icon: 'process'
                    },
                    {
                        id: '4',
                        type: 'robot',
                        label: 'RPA机器人',
                        icon: 'robot'
                    },
                    {
                        id: '5',
                        type: 'ocr',
                        label: 'OCR识别',
                        icon: 'ocr'
                    }

                ]
            }
        },
        methods: {
            // 新增Step
            addStep(stepType){
                this.$emit('addStep', stepType);
            }
        }
    }
</script>
