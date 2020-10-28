<template>
    <div class="stage-container" ref="stageContainer">
        <draggable class="stage-list" :list="stageList" :options="stageOption">
            <stageDef v-for="(stage, stageIndex) in stageList" :key="stage.defId"
                      :stage.sync="stage" :stageList.sync="stageList" :stageIndex="stageIndex"
                      :stageType.sync="stageType" :stepType.sync="stepType">
                <template slot="stageSlot">
                    <draggable tag="ul" class="process-list" :list="stage.children" :options="groupOption">
                        <template v-for="(stageItem, stageItemIndex) in stage.children">
                            <stepDef :key="stageItem.stepCode"
                                     v-if="stageItem.defType == 'step' && curOptional(stageItem.optional)"
                                     :step.sync="stageItem" :stepList.sync="stage.children" :stepIndex="stageItemIndex"
                                     :stepType.sync="stepType" @click.native.stop="chooseActive">
                            </stepDef>
                            <groupDef ref="groupDef" :key="stageItem.defId" v-else
                                      :group.sync="stageItem"
                                      :groupList.sync="stage.children"
                                      :groupIndex="stageItemIndex"
                                      :groupType.sync="stepType"
                                      :chooseActive="chooseActive"></groupDef>
                        </template>
                    </draggable>
                </template>
            </stageDef>
        </draggable>
        <div class="stage-item add-btn" @click="addStage">
            <div class="stage-item-title">
                <em class="el-icon-plus"></em>
                <span class="title">stage</span>
            </div>
        </div>
    </div>
</template>

<script>
    import taskInfoDialog from './step-detail';

    export default {
        props: {
            stageList: {
                type: Array,
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
                taskInfoDialog,
                stageOption: {handle: '.drag-bar', group: {name: 'stage'}, ghostClass: 'stage-ghost'},
                groupOption: {group: {name: 'step'}, ghostClass: 'stepGhost'},
                stepOption: {group: {name: 'step'}, ghostClass: 'stepGhost'},
            }
        },
        methods: {
            // 当前step是否为生命周期或可选任务
            curOptional(optional) {
                return optional === (this.stepType === 'optionalSteps');
            },

            // 新增stage
            addStage() {
                let newStage = {
                    defId: this.$agnesAcUtils.randomString(6),
                    defName: '',
                    defType: 'stage',
                    optional: this.stageType === 'stages',
                    edit: true,
                    children: []
                };
                this.stageList.push(newStage);
            },

            // 当前选择项激活
            chooseActive(e) {
                if (!e) return false;
                if (e.currentTarget.className.indexOf('active') === -1) {
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
        },
    }
</script>