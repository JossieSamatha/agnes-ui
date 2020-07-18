<template>
    <div class="step-comp">
        <i class="step-icon" :class="iconTypeObj" v-html="lcImg[iconTypeObj]"></i>
        <span class="name" :title="step.stepName">{{step.stepName}}</span>
        <span class="edit">
            <i class="fa fa-edit" @click="editTaskInfo"></i>
            <i class="fa fa-trash-o" @click="deleteTask"></i>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            step: {
                type: Object,
                require: true
            },
            stepList: {
                type: Array,
                require: true
            },
            stepIndex: {
                type: Number,
                require: true
            },
            stepType: {
                type: String,
                require: true
            }
        },
        data(){
            return {
                lcImg: this.$lcImg
            }
        },
        computed: {
            iconTypeObj() {
                const iconIndex = parseInt(this.step.stepActType) - 1;
                const iconTypeArr = ['indicator', 'process', 'person', 'robot'];
                return iconTypeArr[iconIndex] || 'person';
            }
        },
        methods: {
            // 修改task信息
            editTaskInfo() {
                this.$app.runCmd('openDialog', 'edit', this.step, {stepIndex: this.stepIndex, stepList: this.stepList});
            },

            // 删除task
            async deleteTask() {
                const ok = await this.$msg.ask(`确认删除吗, 是否继续?`);
                if (ok) {
                    this.stepList.splice(this.stepIndex, 1)
                }
            }
        }
    }
</script>
<style>

</style>
