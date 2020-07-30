<template>
    <div class="stage-item" :class="{'edit':stage.edit}">
        <div class="stage-item-title" @dblclick="editStageTitle">
            <i class="drag-bar fa fa-th"></i>
            <span class="title">
                <el-input ref="titleInput" class="title-input" :title="stage.defName" v-model="stage.defName"
                          :disabled="!stage.edit" size="mini" clearable
                          @keyup.enter.native="saveStageTitle" @blur="saveStageTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!stage.edit}">
                    <i class="fa fa-trash-o" @click="deleteStage"></i>
                </span>
            </span>
        </div>
        <div class="stage-item-content">
            <slot name="stageSlot"></slot>
        </div>
        <div class="add-task">
            <span class="stage-add">
                <i class="el-icon-plus"></i>
                <span class="title">STEP</span>
                <step-act-type @addStep="addStep"></step-act-type>
            </span>
            <span @click="addGroup">
                <i class="el-icon-plus"></i>
                <span class="title">GROUP</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            stage: {
                type: Object,
                require: true
            },
            stageList: {
                type: Array,
                require: true
            },
            stageIndex: {
                type: Number,
                require: true
            },
            stageType: {
                type: String,
                require: true
            },
            stepType: {
                type: String,
                require: true
            }
        },
        mounted(){
            this.stage.edit ? this.$refs.titleInput.focus() : false;
        },
        updated(){
            this.stage.edit ? this.$refs.titleInput.focus() : false;
        },
        methods: {
            // 修改Stage标题
            editStageTitle() {
                this.$set(this.stage, 'edit', true);
            },

            // 保存Stage标题
            saveStageTitle() {
                this.$set(this.stage, 'edit', false);
            },

            // 删除Stage
            async deleteStage() {
                const ok = await this.$msg.ask(`确认删除吗, 是否继续?`);
                if (ok) {
                    this.stageList.splice(this.stageIndex, 1)
                }
            },

            // 新增Step
            addStep(stepData) {
                this.$app.runCmd('openStepDialog', 'add', {}, {
                    addType: 'stage',
                    curStage: this.stage,
                    stepType: this.stepType,
                    stepData: stepData
                });
            },

            // 新增group
            addGroup() {
                const group = {
                    defId: this.$caseUtils.randomString(6),
                    defName: "",
                    defType: "group",
                    optional: this.stageType === 'stages',
                    optionalSteps: [],
                    steps: [],
                    edit: true
                };
                if (!this.stage.children) {
                    this.$set(this.stage, 'children', []);
                }
                this.stage.children.push(group);
            }
        }
    }
</script>
