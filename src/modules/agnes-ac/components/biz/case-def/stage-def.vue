<template>
    <div class="stageItem">
        <div class="stageItemTitle">
            <i class="dragBar fa fa-th"></i>
            <span class="title">
                <el-input class="title-input" :title="stage.defName" v-model="stage.defName"
                          :disabled="!stage.edit" size="mini" clearable
                          @keyup.enter.native="saveStageTitle" @blur="saveStageTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!stage.edit}">
                    <i class="fa fa-edit" v-if="!stage.edit" @click="editStageTitle"></i>
                    <i class="fa fa-save" v-if="stage.edit" @click="saveStageTitle"></i>
                    <i class="stageAdd el-icon-plus">
                        <step-act-type @addStep="addStep" @addGroup="addGroup"></step-act-type>
                    </i>
                    <i class="fa fa-trash-o" @click="deleteStage"></i>
                </span>
            </span>
        </div>
        <div class="stageItemContent">
            <slot name="stageSlot" ></slot>
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
        data() {
            return {
            }
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
            addStep(stepData){
                this.$app.runCmd('openDialog', 'add', {}, {addType: 'stage', curStage: this.stage, stepType: this.stepType, stepData: stepData});
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
