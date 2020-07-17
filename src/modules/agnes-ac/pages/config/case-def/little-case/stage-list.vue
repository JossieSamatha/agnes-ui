<template>
    <div class="stage-container" ref="stageContainer">
        <draggable class="stageList" :list="stageList" :options="stageOption">
            <stageDef v-for="(stage, stageIndex) in stageList" :key="stage.defId"
                      :stage.sync="stage" :stageList.sync="stageList" :stageIndex="stageIndex"
                      :stageType.sync="stageType" :stepType.sync="stepType">
                <template slot="stageSlot">
                    <draggable tag="ul" class="processList" :list="stage.children" :group="{name: 'step'}" :sort="true">
                        <template v-for="(stageItem, stageItemIndex) in stage.children">
                            <stepDef :key="stageItem.stepCode" v-if="stageItem.defType == 'step' && curOptional(stageItem.optional)"
                                     :step.sync="stageItem" :stepList.sync="stage.children" :stepIndex="stageItemIndex"
                                     :stepType.sync="stepType">
                            </stepDef>
                            <groupDef :key="stageItem.defId" v-if="stageItem.defType == 'group'"
                              :group.sync="stageItem" :groupList.sync="stage.children" :groupIndex="stageItemIndex"
                              :groupType.sync="stepType"></groupDef>
                        </template>
                    </draggable>
                </template>
            </stageDef>
        </draggable>
        <div class="stageItem addBtn" @click="addStage">
            <div class="stageItemTitle">
                <i class="el-icon-plus"></i>
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
                stageOption: {handle: '.dragBar', group: {name: 'stage'}, ghostClass: 'stageGhost'},
                groupOption: {group: {name: 'step'}, ghostClass: 'stepGhost'},
                stepOption: {group: {name: 'step'}, ghostClass: 'stepGhost'}
            }
        },
        methods: {
            // 当前step是否为生命周期或可选任务
            curOptional(optional){
                return optional === (this.stepType === 'optionalSteps');
            },

            // 新增stage
            addStage() {
                let newStage = {
                    defId: this.$caseUtils.randomString(6),
                    defName: '',
                    defType: 'stage',
                    optional: this.stageType === 'stages',
                    edit: true,
                    children: []
                };
                this.stageList.push(newStage);
            }
        },
    }
</script>
<style>

</style>
