<template>
    <div class="stage-item" :class="{'edit':stage.edit}">
        <div class="stage-item-title" :title="stage.defName" @dblclick="editStageTitle" :style="titleStyle">
            <em class="drag-bar fa fa-th" v-if="!preview"></em>
            <span class="title" v-if="!preview">
                <el-input ref="titleInput" class="title-input" :title="stage.defName" v-model="stage.defName"
                          :disabled="!stage.edit" size="mini" clearable
                          @keyup.enter.native="saveStageTitle" @blur="saveStageTitle"></el-input>
                <span class="edit" :class="{'is-disabled':!stage.edit}" v-show="mode!='view'">
                    <em class="fa fa-trash-o" @click="deleteStage"></em>
                </span>
            </span>
            <span class="title" v-else>
                <span>
                    <span class="name">{{stage.defName}}</span>
                    <span class="num"><span style="color:#52C41C">{{stage.completeNum}}</span>/{{stage.targetNum}}</span>
                </span>
                <span class="status" v-if="stage.status"><em v-html="getStatusIcon(stage.status).icon"></em></span>
            </span>
        </div>
        <div class="stage-item-content">
            <slot name="stageSlot"></slot>
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
            },
            mode: {
                type: String,
                default: 'add'
            },
            preview: {
                type: Boolean,
                default: false
            },
            getStatusIcon: Function
        },
        computed: {
            titleStyle() {
                if(this.preview){
                    return {'border-color': this.getStatusIcon(this.stage.status).color};
                }else{
                    return '';
                }
            }
        },
        watch: {
            stageIndex(val){
                this.stage.sortNum = val+1;
            }
        },
        mounted(){
            if(this.stage.edit){
                this.$refs.titleInput.focus()
            }
        },
        updated(){
            if(this.stage.edit){
                this.$refs.titleInput.focus()
            }
        },
        methods: {
            // 修改Stage标题
            editStageTitle() {
                if(this.preview){
                    return;
                }
                this.$set(this.stage, 'edit', true);
            },

            // 保存Stage标题
            async saveStageTitle() {
                if(!this.stage.defName){
                    this.$alert('stage标题不完整，将给予默认值！', '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                            this.stage.defName='default';
                            this.$refs.titleInput.focus();
                        }
                    });
                }else{
                    this.$set(this.stage, 'edit', false);
                }
            },

            // 删除Stage
            async deleteStage() {
                const ok = await this.$msg.ask(`确认删除吗, 是否继续?`);
                if (ok) {
                    this.$app.runCmd('openStepDialog', 'deleteStage', this.stage.children);
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
                    defId: this.$agnesAcUtils.randomString(6),
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
