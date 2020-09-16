<template>
    <div class="stage-container" ref="stageContainer">
        <div class="stage-list">
            <stageDef v-for="(stage, stageIndex) in stageList" :key="stage.defId"
                      :stage.sync="stage" :stageList.sync="stageList" :stageIndex="stageIndex"
                      stageType="stages" stepType="steps" :preview="preview"
                      :getStatusIcon="getStatusIcon"
                      @dblclick.native.stop="showTableDetail('stage',stage,stage.ruCaseStepList)"
                      @click.native.stop="chooseActive">
                <template slot="stageSlot">
                    <ul class="process-list">
                        <template v-for="(stageItem, stageItemIndex) in stage.children">
                            <stepDef v-if="stageItem.defType === 'step'"
                                      :key="stageItem.stepCode"
                                     :step.sync="stageItem"
                                     :stepList.sync="stage.children"
                                     :stepIndex="stageItemIndex"
                                     stepType="steps"
                                     :preview="preview"
                                     :ruCaseStepList="stage.ruCaseStepList"
                                     :getStatusIcon="getStatusIcon"
                                     @click.native.stop="chooseActive">
                            </stepDef>
                            <groupDef ref="groupDef" :key="stageItem.defId" v-else
                                      :group.sync="stageItem"
                                      :groupList.sync="stage.children"
                                      :groupIndex="stageItemIndex"
                                      groupType="steps"
                                      :preview="preview"
                                      :ruCaseStepList="stage.ruCaseStepList"
                                      :getStatusIcon="getStatusIcon"
                                      :showTableDetail="showTableDetail"
                                      :chooseActive="chooseActive"></groupDef>
                        </template>
                    </ul>
                </template>
            </stageDef>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            stageList: {
                type: Array,
                require: true
            },
            preview: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                lcImg: this.$lcImg
            }
        },
        methods: {
            // 当前选择项激活
            chooseActive(e) {
                if (!e) return false;
                if (!e.currentTarget.className.includes('active')) {
                    let activeProcess = document.getElementsByClassName('process-item active');
                    let activeStage = document.getElementsByClassName('stage-item active');
                    if(activeProcess.length>0){
                        activeProcess[0].classList.remove('active');
                    }else if(activeStage.length>0){
                        activeStage[0].classList.remove('active');
                    }
                    if (!e.currentTarget.className.includes('step-comp')) {
                        e.currentTarget.classList.add('active');
                    }
                }
            },

            // 展开表格显示详情
            showTableDetail(listType, listInfo, ruCaseStepList){
                let tableArr = [];
                let orgHierarchy = [];
                let traverseArr = [];
                if(listType === 'stage'){
                    traverseArr = listInfo.children;
                }else{
                    traverseArr = listInfo.steps;
                }
                const gridData = this.traverseData(traverseArr, orgHierarchy, tableArr, ruCaseStepList);
                this.$emit('showTableDetail', gridData);
            },

            traverseData(arr, orgHierarchy, tableArr, ruCaseStepList){
                arr.forEach((groupItem)=>{
                    let newHierarchy = [].concat(orgHierarchy);
                    if(groupItem.defType === 'group'){
                        newHierarchy.push(groupItem.defName);
                        this.traverseData(groupItem.steps, newHierarchy, tableArr, ruCaseStepList);
                    }else{
                        newHierarchy.push(groupItem.stepName);
                        const stepCode = groupItem.stepFormInfo.caseStepDef.stepCode;
                        let rowData = ruCaseStepList[stepCode];
                        rowData.orgHierarchy = newHierarchy;
                        tableArr.push(rowData);
                    }
                });
                return tableArr;
            },

            getStatusIcon(statusId) {
                const stepStatus = this.$agnesAcUtils.getStepStatusMap();
                const icon = stepStatus.get(statusId).icon;
                const color = stepStatus.get(statusId).color;
                let iconStr = '';
                if(icon){
                    iconStr = this.lcImg[icon];
                }
                return {
                    color: color,
                    icon: iconStr
                }
            },
        },
    }
</script>
<style>

</style>
