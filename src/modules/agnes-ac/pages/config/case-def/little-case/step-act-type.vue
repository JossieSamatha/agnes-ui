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
                        id: '01',
                        type: 'indicator',
                        label: '指标任务',
                        icon: 'indicator'
                    },
                    {
                        id: '03',
                        type: 'process',
                        label: '流程任务',
                        icon: 'process'
                    },
                    {
                        id: '00',
                        type: 'person',
                        label: '人工任务',
                        icon: 'person'
                    },
                    {
                        id: '04',
                        type: 'robot',
                        label: '机器人任务',
                        icon: 'robot'
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
