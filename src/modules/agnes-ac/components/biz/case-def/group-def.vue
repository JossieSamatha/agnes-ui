<template>
    <li class="process-item">
        <div class="process-item-title">
            <span class="title">
                <el-input ref="titleInput" class="title-input" :title="group.defName" v-model="group.defName"
                          :disabled="!group.edit" size="mini" clearable
                          @keyup.enter.native="savegroupTitle" @blur="savegroupTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!group.edit}">
                    <i class="fa fa-edit" v-if="!group.edit" @click="editgroupTitle"></i>
                    <i class="fa fa-save" v-if="group.edit" @click="savegroupTitle"></i>
                    <i class="stage-add el-icon-plus">
                        <step-act-type @addStep="addStep" @addGroup="addGroup"></step-act-type>
                    </i>
                    <i class="fa fa-trash-o" @click="deletegroup"></i>
                </span>
            </span>
        </div>
        <div class="group-item-content">
            <draggable tag="ul" class="step-list" v-model="group[groupType]" :group="{name: 'step'}" :sort="true">
                <template v-for="(groupItem, groupItemIndex) in group[groupType]">
                    <stepDef :key="groupItem.stepCode" v-if="groupItem.defType == 'step'&& curOptional(groupItem.optional)"
                             :step.sync="groupItem" :stepList.sync="group[groupType]" :stepIndex="groupItemIndex"
                             :stepType.sync="groupType">
                    </stepDef>
                    <groupDef :key="groupItem.defId" v-else
                              :group.sync="groupItem" :groupList.sync="group[groupType]" :groupIndex="groupItemIndex"
                              :groupType.sync="groupType">
                    </groupDef>
                </template>
            </draggable>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'groupDef',
        props: {
            group: {
                type: Object,
                require: true
            },
            groupList: {
                type: Array,
                require: true
            },
            groupIndex: {
                type: Number,
                require: true
            },
            groupType: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                groupOption: {group: {name: 'step'}, ghostClass: 'stepGhost'},
                stepType: [
                    {
                        type: 'action',
                        label: '人工任务',
                        icon: 'fa fa-hand-stop-o'
                    },
                    {
                        type: 'indicator',
                        label: '指标任务',
                        icon: 'fa fa-tag'
                    },
                    {
                        type: 'form',
                        label: '表单流程',
                        icon: 'fa fa-columns'
                    },
                    {
                        type: 'multiForm',
                        label: '多表单流程',
                        icon: 'fa fa-wpforms'
                    },
                ]
            }
        },
        mounted(){
            this.group.edit ? this.$refs.titleInput.focus() : false;
        },
        methods: {
            // 当前step是否为生命周期或可选任务
            curOptional(optional){
                return optional === (this.groupType === 'optionalSteps');
            },

            // 修改group标题
            editgroupTitle() {
                this.$set(this.group, 'edit', true);
            },

            // 保存group标题
            savegroupTitle() {
                this.$set(this.group, 'edit', false);
            },

            // 删除group
            async deletegroup() {
                const ok = await this.$msg.ask(`确认删除吗, 是否继续?`);
                if (ok) {
                    this.groupList.splice(this.groupIndex, 1)
                }
            },

            // 新增Step
            addStep(stepData){
                this.$app.runCmd('openStepDialog', 'add', {}, {addType: 'group', curStage: this.group, stepType: this.groupType, stepData: stepData});
            },

            // 新增group
            addGroup() {
                const group = {
                    defId: this.$caseUtils.randomString(6),
                    defName: "",
                    defType: "group",
                    optionalSteps: [],
                    steps: [],
                    edit: true
                };
                this.group[this.groupType].push(group);
            }
        }
    }
</script>
<style>

</style>
