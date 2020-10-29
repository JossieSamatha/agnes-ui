<template>
    <div class="gridContainer" :class="isGridEdit?'edit':''">
        <dash-board-group ref="gridBoardGroup"
                          :boardDataObj="gridDataArr"
                          :boardFrameObj="gridLayout"
                          :isGridDefine="isGridDefine"
                          :isGridEdit="isGridEdit" >
        </dash-board-group>
        <div class="elChooseArrContent" v-show="elChooseContentShow">
            <draggable class="dragDiv" :list="elChooseArr" group="unitGroup" :disabled="dragDisabled"
                       @start="elChooseDragStart" @end="elChooseDragEnd">
                <div class="elChooseDiv" v-for="elData in elChooseArr" :key="elData.id">
                    <p class="title">{{elData.label}}</p>
                    <p class="content" :style="{'background-image':'url('+getImgPath(elData.img)+')'}"></p>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import boardData from './board-data';
    export default {
        props:{
            pageId: String
        },
        data() {
            return {
                boardData: boardData,
                boardStyleArr: [],   // 面板类型总数据，
                isGridEdit: false,                        // 面板当前是否编辑
                isGridDefine: false,                      // 面板当前是否编辑
                // 面板gird信息
                ifLayoutReady: false,                     // 面板是否加载完成
                gridLayout: {}, // 面板表格布局数据
                gridDataArr:{},         // 面板表格数据
                boardUnitHeight: 0,     // 面板初始单元高度
                gridBoardObj: JSON.parse(JSON.stringify(boardData.boardArrDefault[0])),     // 当前选择面板对象
                movedUnitId: -1,      // 当前移动的单元格索引


                // 条形面板选择区
                elChooseArr:[],                                // 条形面板数据
                elChooseContentShow: false,                    // 条形面板是否显示
                dragDisabled: true,
            }
        },
        beforeMount(){
            this.gridLayout = this.pageId === 'client' ?
                this.$utils.deepClone(boardData.boardArrDefault[0]) :
                this.$utils.deepClone(boardData.boardArrDefault[1]);
            this.boardStyleArr = this.pageId === 'client' ?
                boardData.boardStyleArr : boardData.boardStyleDep;

        },
        mounted(){
            const boardDataArr = this.gridLayout.boardData;
            for(let i=0; i<boardDataArr.length; i++){
                if(this.boardStyleArr[i]){
                    const objArr = [this.boardStyleArr[i]];
                    const gridLayoutObj = boardDataArr[i];
                    this.$set(this.gridDataArr, gridLayoutObj.i, objArr);
                }
            }
        },
        watch:{
            isGridEdit(val){
                this.elChooseContentShow = val;
                this.dragDisabled = !val;
            },

            gridDataArr:{
                handler: function (val) {
                    let leftData = [];
                    let unitObjIds = [];
                    this.$utils.forEach(val,function (obj) {
                        if(obj[0] && obj[0].id){
                            unitObjIds.push(obj[0].id);
                        }
                    });
                    this.boardStyleArr.forEach(function (item) {
                        if(unitObjIds.indexOf(item.id) == -1){
                            leftData.push(item);
                        }
                    });
                    this.elChooseArr = leftData;
                },
                deep: true
            }
        },
        methods: {
            // 条形面板选择 -- 开始拖动
            elChooseDragStart(){
                this.movedUnitId = -1;
                this.elChooseContentShow = false;
            },

            // 条形面板选择 -- 拖动结束
            elChooseDragEnd(){
                this.elChooseContentShow = true;
            },

            getImgPath(imgName){
                return require('../../assets/clientView/'+imgName+'.png');
            },

            addUnitGrid(newUnitObj) {
                this.$refs.gridBoardGroup.addBoardUnit(newUnitObj);
            }
        }
    }
</script>