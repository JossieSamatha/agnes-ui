<template>
    <div class="datav_client_view" ref="datav_client_view" style="padding:0">
        <div class="topPanel">
            <div class="optionPanel">
                <span></span>
                <div>
                    <span class="boardeEdit" v-if="!isGridEdit && !isGridDefine" @click="boardEdit">配置看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEdit">切换看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEditFinish('content')">完成配置</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="addUnitGrid">新增面板</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="boardEditFinish('layout')">保存面板</span>
                </div>
            </div>
        </div>
        <grid-container ref="gridContainer" :pageId="pageId"></grid-container>
        <board-choose ref="boardChoose"
                :showDialog="boardChooseDialog"
                @closeDialog="closeDialog"
                @boardChooseSure="boardChooseSure" @defineBoard="defineBoard">
        </board-choose>
    </div>
</template>

<script>
    import boardData from './board-data';
    import gridContainer from './grid-container';
    import boardChoose from './board-choose';
    export default {
        props:{
            pageId: String
        },
        data() {
            return {
                guestInfo: boardData.guestInfo,
                clientValue: '',
                isGridDefine: false,            // 面板当前是否编辑
                isGridEdit: false,              // 面板当前是否编辑
                boardChooseDialog: false,       // 面板选择弹框
            }
        },
        components: {
            'grid-container': gridContainer,
            'board-choose': boardChoose
        },
        methods: {
            // 配置看板 -- 点击展开弹窗 -- 查询自定义面板数据
            boardEdit(){
                this.boardChooseDialog = true;
            },

            // 配置看板 -- 自定义面板
            defineBoard() {
                this.isGridEdit = false;
                this.isGridDefine = true;
                this.$refs.gridContainer.isGridEdit = false;
                this.$refs.gridContainer.isGridDefine = true;
                this.boardChooseDialog = false;
            },

            // 面板grid -- 新增单元
            addUnitGrid() {
                const newUnitId = this.$agnesAcUtils.randomString(6);
                const newUnitObj = {
                    "x": 0,
                    "y": 0,
                    "w": 2,
                    "h": 2,
                    "i": newUnitId
                };
                this.$set(this.$refs.gridContainer.gridDataArr,newUnitId,[]);
                this.$refs.gridContainer.addUnitGrid(newUnitObj);
            },

            // 关闭弹窗
            closeDialog(){
                this.boardChooseDialog = false;
            },

            // 面板完成编辑
            boardEditFinish(editType){
                if(editType == 'content'){
                    this.isGridEdit = false;
                    this.$set(this.$refs.gridContainer, 'isGridEdit', false);
                }else if(editType == 'layout'){
                    this.isGridDefine = false;
                    this.$set(this.$refs.gridContainer, 'isGridDefine', false);
                    const newdDefineBoard = {
                        boardId: this.$agnesAcUtils.randomString(9),
                        boardData: this.$refs.gridContainer.gridLayout.boardData
                    };
                    this.$refs.boardChoose.boardArrDefine.push(newdDefineBoard);
                    this.$refs.boardChoose.choosedBoard = newdDefineBoard;
                }
            },

            // 面板布局选择 -- 点击确定
            boardChooseSure(choosedBoard){
                this.boardChooseDialog = false;
                this.$refs.gridContainer.elChooseContentShow = true;
                this.isGridEdit = true;
                this.isGridDefine = false;
                this.$set(this.$refs.gridContainer, 'isGridEdit', true);
                this.$set(this.$refs.gridContainer, 'isGridDefine', false);
                let gridLayout =  JSON.parse(JSON.stringify(choosedBoard));
                let boardDataArr = gridLayout.boardData;
                let boardStyleArr = this.$refs.gridContainer.boardStyleArr;
                let gridDataArr = {};
                for(let i=0; i<boardDataArr.length; i++){
                    if(boardStyleArr[i]){
                        const objArr = [boardStyleArr[i]];
                        const gridLayoutObj = boardDataArr[i];
                        gridDataArr[gridLayoutObj.i] = objArr;
                    }
                }

                this.$refs.gridContainer.gridLayout = gridLayout;
                this.$refs.gridContainer.gridDataArr = gridDataArr;

                this.$nextTick(function () {
                    this.gridItemResized();
                });
            },

            // 面板单元拉伸结束
            gridItemResized(){
                this.$nextTick(function () {
                    // 兼容IE
                    if(document.createEvent) {
                        let event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    } else if(document.createEventObject) {
                        window.fireEvent("onresize");
                    }
                });
            },
        }
    };
</script>
