<template>
    <li class="process-item" ref="groupDef" @click.stop="chooseActive" :class="{'active':group.active}">
        <div class="process-item-title" @dblclick="editgroupTitle" :class="{'edit':group.edit}">
            <i class="fa fa-list-ul"></i>
            <span class="title">
                <el-input ref="titleInput" class="title-input" :title="group.defName" v-model="group.defName"
                          :disabled="!group.edit" size="mini" clearable
                          @keyup.enter.native="savegroupTitle" @blur="savegroupTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!group.edit}">
                    <i class="fa fa-trash-o" @click="deletegroup"></i>
                </span>
            </span>
        </div>
        <div class="group-item-content">
            <ul class="step-list">
                <template v-for="(groupItem, groupItemIndex) in group[groupType]">
                    <stepDef v-if="groupItem.defType == 'step'&& curOptional(groupItem.optional)"
                             :key="groupItem.stepCode"
                             :step.sync="groupItem"
                             :stepList.sync="group[groupType]"
                             :stepIndex="groupItemIndex"
                             :stepType.sync="groupType"
                             @click.native.stop="chooseActive">
                    </stepDef>
                    <groupDef :key="groupItem.defId" v-else
                              :group.sync="groupItem"
                              :groupList.sync="group[groupType]"
                              :groupIndex="groupItemIndex"
                              :groupType.sync="groupType"
                              @click.stop="chooseActive">
                    </groupDef>
                </template>
            </ul>
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
                ],
                activeIndex: '',
                activeGroup: true
            }
        },
        mounted() {
            this.group.edit ? this.$refs.titleInput.focus() : false;
        },
        updated() {
            this.group.edit ? this.$refs.titleInput.focus() : false;
        },
        methods: {
            // 当前step是否为生命周期或可选任务
            curOptional(optional) {
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
            addStep(stepData) {
                this.$app.runCmd('openStepDialog', 'add', {}, {
                    addType: 'group',
                    curStage: this.group,
                    stepType: this.groupType,
                    stepData: stepData
                });
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
            },

            // 当前选择项激活
            chooseActive(e) {
                if(e.currentTarget.className.indexOf('active') === -1){
                    let activeStep = document.getElementsByClassName('step-comp active');
                    let activeProcess = document.getElementsByClassName('process-item active');
                    activeStep.forEach((activeItem) => {
                        activeItem.classList.remove('active');
                    });
                    activeProcess.forEach((activeItem) => {
                        activeItem.classList.remove('active');
                    });
                    e.currentTarget.classList.add('active');
                }
            },
        }
    }
</script>
<style>

</style>
