<template>
    <dash-board-frame ref="gridBoardBasic"
                      :gridData="boardFrameObj.boardData"
                      :isGridDefine="isGridDefine"
                      :colNum="boardColNum"
                      @delBoardUnit="delBoardUnit"
                      :extEvent="{'layout-ready': layoutReadyEvent}">
        <template slot="grid-item-content" slot-scope="{unitGrid, unitGridIndex}">
            <dash-board-content
                    :draggableList="boardDataObj[unitGrid.i]"
                    :draggableId="unitGrid.i"
                    :isGridEdit="isGridEdit"
                    @gridUnitDragStart="gridUnitDragStart"
                    @gridUnitDragEnd="gridUnitDragEnd"
                    @gridUnitDragAdd="gridUnitDragAdd"
                    @gridUnitDel="gridUnitDel">
                <template slot="group-content" slot-scope="{unitData}">
                    <component
                            v-if="unitData.compType && ifLayoutReady"
                            :is="unitData.compType"
                            :pageType="unitData.pageType"
                            v-bind="unitData.compParams"
                            :unitPosData = "{unitId: unitGrid.i, unitGridIndex}"
                            @hideMyIndex="hideMyIndex"
                    >
                    </component>
                </template>
            </dash-board-content>
        </template>
    </dash-board-frame>
</template>

<script>
    export default {
        props: {
            boardDataObj: {
                type: Object,
                require: true
            },
            boardFrameObj: {
                type: Object,
                require: true
            },
            isGridDefine: {
                type: Boolean,
                default: false
            },
            isGridEdit: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                movedUnitId: -1,
                ifLayoutReady: false,
            }
        },
        computed: {
            boardColNum(){
                if(this.boardFrameObj.boardColNum){
                    return parseInt(this.boardFrameObj.boardColNum);
                }else{
                    return 12;
                }
            }
        },
        methods: {
            // grid-board-frame -- 新增单元
            addBoardUnit(newUnitObj) {
                this.boardFrameObj.boardData.push(newUnitObj);
            },

            // 面板grid-board-frame -- 删除单元
            delBoardUnit(delUnitId){
                this.$delete(this.boardDataObj, delUnitId);
            },

            hideMyIndex(unitPosData){
              const {unitId, unitGridIndex} = unitPosData;
              this.$refs.gridBoardBasic.delBoardUnit(unitId, unitGridIndex);
            },

            // 面板加载完成
            layoutReadyEvent() {
                this.ifLayoutReady = true;
            },

            // 面板grid -- 单元开始拖动
            gridUnitDragStart(movedUnitId) {
                this.movedUnitId = movedUnitId;
                this.$parent.elChooseContentShow = false;
            },

            // 面板grid -- 单元拖动结束
            gridUnitDragEnd() {
                this.$parent.elChooseContentShow = true;
            },

            // 面板grid -- 单元拖动结束
            gridUnitDragAdd(changeData) {
                const changeIndex = this.movedUnitId;
                this.$set(this.boardDataObj,changeIndex,changeData);
            },

            // 面板grid -- 单元数据删除
            gridUnitDel(delUnitId) {
                this.$set(this.boardDataObj,delUnitId,[]);
            }
        }
    }
</script>