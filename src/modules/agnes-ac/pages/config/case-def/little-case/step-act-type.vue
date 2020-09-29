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
                        id: '7',
                        type: 'robot',
                        label: '自动处理任务',
                        icon: 'robot'
                    },
                    {
                        id: '6',
                        type: 'person',
                        label: '人工MOT任务',
                        icon: 'person'
                    },
                    {
                        id: '3',
                        type: 'process',
                        label: '审批流程任务',
                        icon: 'process'
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
