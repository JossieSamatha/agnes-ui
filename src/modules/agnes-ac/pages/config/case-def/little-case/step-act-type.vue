<template>
    <ul class="step-type">
        <li v-for="stepType in stepTypeOption"
            :key="stepType.id"
            :class="stepType.type"
            :title="stepType.label"
            v-html="lcImg[stepType.icon]"
            @click="addStep(stepType.id)">
        </li>
        <li class="group" @click="addGroup">GROUP</li>
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
                        label: '指标任务',
                        icon: 'indicator'
                    },
                    {
                        id: '2',
                        type: 'process',
                        label: '流程任务',
                        icon: 'process'
                    },
                    {
                        id: '3',
                        type: 'person',
                        label: '人工任务',
                        icon: 'person'
                    },
                    {
                        id: '4',
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
            },

            // 新增group
            addGroup() {
                this.$emit('addGroup');
            }
        }
    }
</script>
