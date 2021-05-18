<template>
    <li ref="groupDef" class="process-item" :class="{'active':group.active}"
        @dblclick.stop="showTableDetail('group', group, ruCaseStepList)"
        @click.stop="chooseActive">
        <div class="process-item-title" @dblclick="editgroupTitle" :class="{'edit':group.edit}">
            <em class="fa fa-list-ul" v-if="!preview"></em>
            <span class="title">
                <el-input ref="titleInput" class="title-input" :title="group.defName" v-model="group.defName"
                          :disabled="!group.edit" size="mini" clearable
                          @keyup.enter.native="$event.target.blur" @blur="savegroupTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!group.edit}" v-if="!preview">
                    <em class="fa fa-trash-o" @click="deletegroup"></em>
                </span>
            </span>
        </div>
        <div class="group-item-content">
            <draggable tag="ul" class="step-list" :list="group[groupType]" :options="groupOption">
                <template v-for="(groupItem, groupItemIndex) in group[groupType]">
                    <stepDef v-if="groupItem.defType == 'step' && curOptional(groupItem.optional)"
                             :key="groupItem.stepCode"
                             :step.sync="groupItem"
                             :stepList.sync="group[groupType]"
                             :stepIndex="groupItemIndex"
                             :stepType.sync="groupType"
                             :preview="preview"
                             :ruCaseStepList="ruCaseStepList"
                             :getStatusIcon="getStatusIcon"
                             @click.native.stop="chooseActive">
                    </stepDef>
                    <groupDef :key="groupItem.defId" v-else
                              :group.sync="groupItem"
                              :groupList.sync="group[groupType]"
                              :groupIndex="groupItemIndex"
                              :groupType.sync="groupType"
                              :showTableDetail="showTableDetail"
                              :ruCaseStepList="ruCaseStepList"
                              :getStatusIcon="getStatusIcon"
                              :chooseActive="chooseActive"
                              :preview="preview">
                    </groupDef>
                </template>
            </draggable>
        </div>
        <div class="add-task" v-if="!preview&&mode!='view'">
            <span class="stage-add">
                <em class="el-icon-plus"></em>
                <span class="title">STEP</span>
                <step-act-type @addStep="addStep"></step-act-type>
            </span>
            <span @click="addGroup">
                <em class="el-icon-plus"></em>
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
            mode: {
                type: String,
                default: 'add'
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
            },
            preview: {
                type: Boolean,
                default: false
            },
            getStatusIcon: Function,
            showTableDetail: {
                type: Function,
                default: ()=>{}
            },
            chooseActive: Function,
            ruCaseStepList: Object
        },
        data() {
            return {
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
                        type: 'icrApprove',
                        label: '智能审单',
                        icon: 'icrApprove'
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
            if(this.group.edit){
                this.$refs.titleInput.focus()
            }
        },
        updated() {
            if(this.group.edit){
                this.$refs.titleInput.focus()
            }
        },
        computed: {
            groupOption(){
                return {
                    group: {name: 'step'},
                    ghostClass: 'stepGhost',
                    disabled: this.preview
                }
            }
        },
        methods: {
            // 当前step是否为生命周期或可选任务
            curOptional(optional) {
                return optional === (this.groupType === 'optionalSteps');
            },

            // 修改group标题
            editgroupTitle() {
                if(this.preview){
                    return;
                }
                this.$set(this.group, 'edit', true);
            },

            // 保存group标题
            async savegroupTitle() {
                if(!this.group.defName) {
                    this.$alert('请补充完整group标题！', '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                            this.$refs.titleInput.focus();
                        }
                    });
                }else{
                    this.$set(this.group, 'edit', false);
                }
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
                    defId: this.$agnesAcUtils.randomString(6),
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